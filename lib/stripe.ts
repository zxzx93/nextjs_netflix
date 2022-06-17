import app from '../firebase'
import { getFunctions, httpsCallable } from '@firebase/functions'
import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments'

const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
})

const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url)) //새로운 주소로 이동
    .catch((error) => console.log(error.message))
}

/**
 * 고객 포털로 리디렉션
 * 고객이 구독하면 고객 포털에 액세스하여 청구서를 보고 결제 및 구독 세부정보를 관리할 수 있는 버튼을 보여주어야 합니다. 사용자가 해당 버튼을 클릭하면 createPortalLink함수를 호출하여 포털 링크를 가져온 다음 리디렉션합니다.
 */
const goToBillingPortal = async () => {
  const instance = getFunctions(app, 'asia-northeast3')
  const functionRef = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  )

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message))
}

export { loadCheckout, goToBillingPortal }
export default payments
