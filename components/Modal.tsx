import React, { useState, useEffect } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import ReactPlayer from 'react-player/lazy'
import { modalState, movieState } from '../atoms/modalAtom'
import {
  XIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from '@heroicons/react/outline'
import { Movie, Element, Genre } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { green } from '@mui/material/colors'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState) //리코일 store에 movie state 가져옴
  const [trailer, setTrailer] = useState('') //비디오 예고편 key
  const [genres, setGenres] = useState<Genre[]>([]) //장르
  const [muted, setMuted] = useState(true) //음소거

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=ko&region=KR&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => {
          console.log(err)
        })

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }

      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixex overflow-y-csroll !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden rounded-md scrollbar-hide"
    >
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`http://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />

          <div className="item-center absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                재생
              </button>

              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>

            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg ">
            <div className="item-center  flex space-x-2 text-sm ">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% MATCH
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="item-center flex h-4 justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>

              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">장르 : </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">언어 : </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">투표수 : </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
