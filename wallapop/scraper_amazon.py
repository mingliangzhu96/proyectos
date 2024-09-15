import os
import re 
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from urllib.parse import urljoin
from webdriver_manager.chrome import ChromeDriverManager

# Configuración del WebDriver de Selenium
chrome_options = Options()
chrome_options.add_argument("--headless")  # Ejecutar en modo sin cabeza
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

# URL del producto de Amazon
url = input('Introduce la URL del producto de Amazon: ')
driver.get(url)

# Esperar hasta que el título del producto esté presente
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, 'productTitle'))
    )
except TimeoutException:
    print("Tiempo de espera agotado. El título del producto no se encontró.")
    driver.quit()

# Esperar un poco más para asegurar que todo el contenido dinámico esté cargado
time.sleep(5)

# Obtener el contenido HTML después de que se ha cargado el JavaScript
html_content = driver.page_source
driver.quit()

# Analizar el contenido HTML con BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

""" # Guardar el contenido de BeautifulSoup en un archivo HTML para depuración
with open('pagina.html', 'w', encoding='utf-8') as file:
    file.write(soup.prettify())
print("El contenido HTML ha sido guardado en 'pagina.html' para depuración.") 
 """

# Extraer el título del producto y limpiar caracteres no válidos para nombres de carpetas
title_element = soup.find('span', {'id': 'productTitle'})
title = title_element.get_text(strip=True) if title_element else 'Sin Título'

# Limpiar caracteres no válidos para nombres de archivos en Windows
invalid_chars = '<>:"/\\|?* '
safe_title = "".join(c for c in title if c not in invalid_chars).strip()

# Limitar la longitud del nombre de la carpeta para evitar problemas de longitud máxima de ruta en Windows
safe_title = safe_title[:12]  # Limita el título a los primeros 100 caracteres

# Crear directorio para las imágenes con el nombre del producto
image_dir = os.path.join('productos', safe_title)
os.makedirs(image_dir, exist_ok=True)

# Buscar todas las li de la página con class 'a-spacing-small item imageThumbnail a-declarative'
list_items = soup.find_all('li', class_='a-spacing-small item imageThumbnail a-declarative')

if not list_items:
    print("No se encontraron ningun li.")

for index, list_item in enumerate(list_items):
    img_element = list_item.find('img', src=True)

    # Priorizar 'data-old-hires' si está disponible, de lo contrario usar 'src'
    img_url = img_element.get('data-old-hires') or img_element.get('src')

    if not img_url:
        continue  # Si no hay URL de imagen, saltar al siguiente

    # Construir URL completa si es relativa
    img_url = urljoin(url, img_url)

    # Imprimir la URL de la imagen para depuración
    print(f"Descargando imagen de: {img_url}")

    # Descargar la imagen y guardarla en el directorio especificado
    try:
        # Modificar el sufijo para obtener una imagen de 522x522 píxeles
        pattern = r'\._.*?_\.'
        img_url_high_res = re.sub(pattern, '._AC_SL1500_.', img_url)
        img_response = requests.get(img_url_high_res)
        img_response.raise_for_status()  # Lanza un error si la solicitud de la imagen falló
        print(f"Imagen guardada: {img_url_high_res}")

        # Guardar la imagen en el directorio
        img_filename = os.path.join(image_dir, f'{index+1}.jpg')
        with open(img_filename, 'wb') as img_file:
            img_file.write(img_response.content)

    except requests.RequestException as e:
        print(f"Error al descargar la imagen {img_url}: {e}")

print(f"Las imágenes han sido descargadas en el directorio '{image_dir}'")
