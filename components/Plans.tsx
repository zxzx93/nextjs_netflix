import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import Table from './Table'

import { CheckIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import Loader from './Loader'
import { loadCheckOut } from '../lib/stripe'

interface Props {
  products: Product[]
}

function Plans({ products }: Props) {
  const { logOut, user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]) //선택한 결제 플랜 (초기값 프리미엄임)
  const [isBillingLoding, setIsBillingLoding] = useState(false)

  //stripe 결제단
  const subscribeToPlan = () => {
    if (!user) return

    loadCheckOut(selectedPlan?.prices[0].id!)
    setIsBillingLoding(true)
  }
  
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            className="cursor-pointer object-contain"
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
          />
        </Link>

        <button
          className="font-midium text-lg hover:underline"
          onClick={logOut}
        >
          로그아웃
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          원하는 멤버쉽 요금제를 선택하고 Netflix의 모든 컨텐츠를 즐기세요.
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#e50914]" />
            원하는 모든 것을 시청하세요. 광고가 없습니다.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#e50914]" />
            당신만을 위한 추천 컨텐츠.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#e50914]" />
            언제든지 요금제를 변경하거나 취소할 수 있습니다.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {products.map((product) => (
              <div
                className={`PlanBox ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoding}
            className={`mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoding && 'opacity-60'
            } }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoding ? <Loader color="dark:fill-gray-300" /> : '구독'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans
