import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import Axios from 'axios'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import payments from '../lib/stripe'
import useSubscription from '../hooks/useSubscription'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[] //stripe 에서 타입 자동으로 정의해줌
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: Props) => {
  const { loading, user } = useAuth()
  const showModal = useRecoilValue(modalState)
  const subScription = useSubscription(user)

  console.log(subScription);
  

  if (loading || subScription === null) return null

  //멤버쉽 구독 없을때 Plans으로 라우팅
  if (!subScription) {
    return <Plans products={products} />
  }

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:py-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24 ">
          <Row title={'Trending Now'} movies={trendingNow} />
          <Row title={'Top Rated'} movies={topRated} />
          <Row title={'Action Thrillers'} movies={actionMovies} />

          {/* 내 리스트 컴포넌트 */}
          <Row title={'Comedies'} movies={comedyMovies} />
          <Row title={'Scary Movies'} movies={horrorMovies} />
          <Row title={'Romance Movies'} movies={romanceMovies} />
          <Row title={'Documentaries'} movies={documentaries} />
        </section>
      </main>

      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  // 플랜 결제 상품 가져오기
  const products = await getProducts(payments, {
    activeOnly: true,
    includePrices: true,
  })
    .then((res) => res)
    .catch((err) => console.log(err.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    Axios(requests.AxiosNetflixOriginals).then((res) => res.data),
    Axios(requests.AxiosTrending).then((res) => res.data),
    Axios(requests.AxiosTopRated).then((res) => res.data),
    Axios(requests.AxiosActionMovies).then((res) => res.data),
    Axios(requests.AxiosComedyMovies).then((res) => res.data),
    Axios(requests.AxiosHorrorMovies).then((res) => res.data),
    Axios(requests.AxiosRomanceMovies).then((res) => res.data),
    Axios(requests.AxiosDocumentaries).then((res) => res.data),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  }
}
