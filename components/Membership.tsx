import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'
import useSubscription from '../hooks/useSubscription'
import { goToBillingPortal } from '../lib/stripe'

function Membership() {
  const { user } = useAuth()
  const subscription = useSubscription(user)
  const [isBillingLoding, setIsBillingLoding] = useState(false)

  const manageSubscription = () => {
    if (subscription) {
      setIsBillingLoding(true)
      goToBillingPortal()
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-1 md:border-x-0 md:border-t md:border-b-0 md:px-0">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">멤버쉽 & 결제 정보</h4>
        <button
          disabled={!subscription || isBillingLoding}
          className={`} h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black  shadow-md hover:bg-gray-200 md:w-4/5`}
          onClick={manageSubscription}
        >
          {isBillingLoding ? <Loader color="dark:fill-gray-300" /> : '구독'}
        </button>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">패스워드 : ***</p>
          </div>
          <div className="text-right">
            <p className="membershipLink">계정 이메일 변경</p>
            <p className="membershipLink">비밀번호 변경</p>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? 'test'
                : '다음 결제일은 2022년 6월 7일 입니다.'}

              {subscription?.current_period_end}
            </p>
          </div>

          <div className="md:text-right">
            <p className="membershipLink">결제 정보 관리</p>
            <p className="membershipLink">예비 결제 수단 등록</p>
            <p className="membershipLink">결제 상세 정보</p>
            <p className="membershipLink">결제일 변경</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Membership
