import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import useAuth from '../../hooks/useAuth'
import useSubscription from '../../hooks/useSubscription'
import payments from '../../lib/stripe'
import Membership from '../../components/Membership'

interface Props {
  products: Product[]
}

function index({ products }: Props) {
  const { user, logOut } = useAuth()
  const subscription = useSubscription(user)

  return (
    <div>
      <Head>
        <title>Account Setting - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-[#141414] ">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            className="cursor-pointer object-contain"
            width={120}
            height={120}
          />
        </Link>
        <Link href="/account">
          <img src="https://rb.gy/g1pwyx" className="cursor-pointer rounded" />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl ">계정</h1>

          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img
              src="https://rb.gy/4vfk4r"
              className="cursor-pointer rounded"
            />
            <p className="text-xs font-semibold text-[#555]">
              멤버쉽 시작: {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">멤버십 상세 정보</h4>
          {/* 현재 플랜 찾기 */}
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            멤버쉽 변경
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>세팅</h4>
          <p className="col-span-3 cursor-pointer text-blue-500  hover:underline">
            모든 디바이스에서 로그아웃
          </p>
        </div>
      </main>
    </div>
  )
}

export default index

//? getStaticProps : "빌드 시에 딱 한 번"만 호출되고, 바로 static file로 빌드
export const getStaticProps: GetStaticProps = async () => {
  // 플랜 결제 상품 가져오기
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((err) => console.log(err))

  return {
    props: {
      products,
    },
  }
}
