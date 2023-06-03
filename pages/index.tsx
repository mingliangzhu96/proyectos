import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['greek-ext'] })

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">欢迎来到发票的世界</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
         
            <Image
              src="/ming1.png"
              alt="ming logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div >
        <p style={{ fontSize: '58px', fontWeight: 'bold' }}>发票</p>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">

        <a onClick={() => handleNavigate('/invoiceForProduct')}
         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
         target="_blank"
         rel="noopener noreferrer"
        >         
            <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
              产品类型的发票{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p
              className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
            >            
              产品发票是一种商业文件，用于记录销售产品或提供服务的交易细节。它是卖方向买方提供的一种证明，确认了交易的发生以及所涉及的产品或服务的详细信息。发票通常包含以下重要信息：
            </p>          
        </a>

        <a onClick={() => handleNavigate('/invoiceForRepair')}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer">
            
            <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
              维修类型的发票{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p
              className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
            >
              维修类型的发票是用于记录维修服务或修理工作的商业文件。它提供了维修服务的详细信息，包括维修项目、维修时间、工时费用、所用零部件以及其他相关费用。维修发票通常包含以下要素
            </p>
        </a>

        <a onClick={() => handleNavigate('/invoiceForUnas')}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            美甲类型的发票{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p
            className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
          >
            美甲发票是指美甲服务提供商向客户提供的结算凭证，用于记录美甲服务的费用和相关信息。美甲发票在商业交易中具有重要的法律和财务意义，既是服务提供商的收入凭证，也是客户的支出凭证。
          </p>
        </a>

        <a onClick={() => handleNavigate('/invoiceForServices')}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            服务类型的发票{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p
            className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
          >
          服务发票是指服务提供商向客户提供的结算凭证，用于记录提供的服务费用和相关信息          </p>
        </a>
      </div>
    </main>
  )
}
