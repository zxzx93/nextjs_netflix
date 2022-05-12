import React, { useState, useEffect } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { XIcon } from '@heroicons/react/outline'
import { Movie } from '../typings'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState) //리코일 store에 state 가져옴

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=ko&region=KR&append_to_response=videos`
      ).then((response) => response.json())
      // console.log(data)
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
        </Modal> */}
      </>
    </MuiModal>
  )
}

export default Modal
