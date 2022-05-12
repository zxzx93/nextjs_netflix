import React from 'react'
import Image from 'next/image'
import { Movie } from '../typings'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  movie: Movie
  // movie: Movie | DocumentData[]
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        className="rounded-sm object-cover md:rounded"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        onClick={() => {
          setCurrentMovie(movie) //배너 현재 무비 정보 들어감
          setShowModal(true)
        }}
      />
    </div>
  )
}

export default Thumbnail
