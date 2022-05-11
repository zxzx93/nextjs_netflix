import Head from 'next/head'
import Image from 'next/image'
import React, { useState} from 'react'

function Login() {
  const [login, setLogin] = useState(false);
  
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <img
        src="https://rb.gy/ulxxee"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md  md:px-14">
        <h1 className="text-4xl font-semibold">로그인</h1>
        <div className="space-y-3">
          <label className="inline-block w-full">
            <input className="input" type="email" placeholder="Email" />
          </label>
          <label className="inline-block w-full">
            <input className="input" type="password" placeholder="Password" />
          </label>

          <button className="w-full rounded bg-[#e50914] py-3 font-semibold">
            로그인
          </button>

          <div className="text-[gray]">
            Netflix 회원이 아닌가요?
            <button
              className="cursor-pointer text-white hover:underline"
              type="submit"
            >
              &nbsp;지금 가입하세요.
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
