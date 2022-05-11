import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email,password}) => {
    if (login) {
      //! await signIn(email,password)
    }else{
      //! await sighUp(email,password)
    }
  }

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md  md:px-14"
      >
        <h1 className="text-4xl font-semibold">로그인</h1>
        <div className="space-y-3">
          <label className="inline-block w-full">
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                이메일은 필수 항목입니다.
              </p>
            )}
          </label>

          <label className="inline-block w-full">
            <input
              className="input"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                패스워드는 필수 항목입니다.
              </p>
            )}
          </label>

          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
            onClick={() => setLogin(true)}
          >
            로그인
          </button>

          <div className="text-[gray]">
            Netflix 회원이 아닌가요?
            <button
              className="cursor-pointer text-white hover:underline"
              type="submit"
              onClick={() => setLogin(false)}
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
