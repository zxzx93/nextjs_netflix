import React, { useRef } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface Props {
  title: string

  // movie: Movie | DocumentData[]
  movies: Movie[]
}

function Row({ title, movies }: Props) {
  const rowRef = useRef()

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="group relative md:-ml-2">
        <ChevronLeftIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />

        <div className="item-center flex space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
      </div>
    </div>
  )
}

export default Row
