import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import Axios from 'axios'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { modalState, movieState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
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
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

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
        <title>
          {movie?.title || movie?.original_name || 'Home'} - Netflix
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:py-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24 ">
          <Row title={'지금 뜨는 콘텐츠'} movies={trendingNow} />
          <Row title={'넷플릭스 인기 콘텐츠'} movies={topRated} />
          <Row title={'액션 & 스릴러 영화'} movies={actionMovies} />

          {/* 내 리스트 컴포넌트 */}
          {list.length > 0 && <Row title={'내 리스트'} movies={list} />}

          <Row title={'코미디'} movies={comedyMovies} />
          <Row title={'호러 영화'} movies={horrorMovies} />
          <Row title={'로맨틱한 영화'} movies={romanceMovies} />
          <Row title={'다큐멘터리'} movies={documentaries} />
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
