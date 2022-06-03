import { useState, useEffect } from 'react'
import {
  Subscription,
  onCurrentUserSubscriptionUpdate,
} from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import payments from '../lib/stripe'

function useSubscription(user: User | null) {
  const [subScription, setSubScription] = useState<Subscription | null>(null)

  //subscription updates
  useEffect(() => {
    if (!user) return

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      //구독 상태 active, trialing만 가지고 옴, cancle은 안들고 옴
      setSubScription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === 'active' ||
            subscription.status === 'trialing'
        )[0]
      )
    })
  }, [user])

  return subScription
}

export default useSubscription
