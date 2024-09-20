import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time
import pandas as pd  # Para crear y guardar el archivo Excel


# Comando para iniciar Chrome con las opciones especificadas
chrome_command = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--remote-debugging-port=9222",
    "--user-data-dir=C:\\Users\\ming\\AppData\\Local\\Google\\Chrome\\User Data\\Default"
]

# Ejecutar el comando en un proceso separado
subprocess.Popen(chrome_command)

# Esperar un momento para asegurarse de que Chrome se inicie correctamente
time.sleep(10)  # Ajusta el tiempo si es necesario

# Configurar Selenium para conectarse a Chrome con el perfil existente
chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")  # Puerto de depuración

# Iniciar el WebDriver conectado a Chrome
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

# Ir a la página de "Mis pedidos" de Amazon
url = "https://www.amazon.es/gp/your-account/order-history?ref_=ya_d_c_yo"
print(f"Conectando a la página: {url}")
driver.get(url)

# Esperar unos segundos para asegurarnos de que la página se haya cargado completamente
print("Esperando a que la página se cargue...")
time.sleep(10)  # Aumenta el tiempo si es necesario

# Intentar encontrar elementos de pedidos
try:
    print("Buscando elementos de pedido...")
    orders = driver.find_elements(By.CLASS_NAME, 'order-card')

    # Filtrar elementos con la clase js-order-card si es necesario
    orders = [order for order in orders if 'js-order-card' in order.get_attribute('class')]
    
    if not orders:
        raise ValueError("No se encontraron pedidos en la página.")
    
    print(f"Se encontraron {len(orders)} pedidos.")

    # Crear una lista para almacenar los datos de los pedidos
    pedidos_data = []

    for order in orders:
        try:
            # Extraer el número de pedido usando la clase yohtmlc-order-id
            print("Extrayendo el número de pedido...")
            order_number_element = order.find_element(By.CLASS_NAME, 'yohtmlc-order-id')
            order_number = order_number_element.text
            print(f"Número de pedido: {order_number}")
        except Exception as e:
            print(f"Error al obtener el número de pedido: {e}")
            order_number = "Número de pedido no encontrado"
        try:
            # Extraer los nombres de productos usando la clase yohtmlc-product-title
            print("Extrayendo nombres de productos...")
            product_elements = order.find_elements(By.CLASS_NAME, 'yohtmlc-product-title')

            if not product_elements:
                print("No se encontraron nombres de productos en este pedido.")
                product_elements = order.find_elements(By.CLASS_NAME, 'a-link-normal')
                
            for product in product_elements:
                product_name = product.text
                # Truncar el nombre del producto a 20 caracteres si es demasiado largo
                if len(product_name) > 20:
                    product_name = product_name[:30] + '...'  # Añadir '...' para indicar truncamiento
                
                # Añadir el pedido a la lista
                pedidos_data.append({'Número de pedido': order_number, 'Nombre del producto': product_name})
                print(f"Producto guardado: {product_name}")

            
        
        except Exception as e:
            print(f"Error al obtener los nombres de productos: {e}")

    # Convertir los datos a un DataFrame de pandas
    df = pd.DataFrame(pedidos_data)

    # Guardar el DataFrame en un archivo Excel
    df.to_excel('pedidos_amazon.xlsx', index=False)
    print("Los datos se han guardado en el archivo pedidos_amazon.xlsx")

except Exception as e:
    print(f"Error general: {e}")

# Opcional: cerrar el navegador cuando termines
# driver.quit()
