import React, { useState, useEffect } from 'react'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          className="cursor-pointer object-contain"
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">홈</li>
          <li className="headerLink">TV 시리즈</li>
          <li className="headerLink">영화</li>
          <li className="headerLink">NEW! 요즘 대세 콘텐츠</li>
          <li className="headerLink">내가 찜한 콘텐츠</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className=" h-6 w-6" />

        {/* <Link href="/account"> */}
        <img
          className="cursor-pointer rounded"
          src="https://rb.gy/g1pwyx"
          alt=""
          onClick={logOut}
        />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
