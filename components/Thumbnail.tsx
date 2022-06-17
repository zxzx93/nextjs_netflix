import React from 'react'
import Image from 'next/image'
import { Movie } from '../typings'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { DocumentData } from 'firebase/firestore'

interface Props {
  movie: Movie | DocumentData //firestore
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState) //모달 열고 닫고
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState) //선택한 영상 상세정보 들어감

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        className="rounded-sm object-cover md:rounded"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        onClick={() => {
          setCurrentMovie(movie) 
          setShowModal(true)
        }}
      />
    </div>
  )
}

export default Thumbnail
