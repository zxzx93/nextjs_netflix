import { useState, useEffect, useContext, createContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

import {
  createUserWithEmailAndPassword, //신규 사용자의 이메일 주소와 비밀번호로 신규 계정을 생성
  signInWithEmailAndPassword, //이메일 주소와 비밀번호로 사용자 로그인 처리
  onAuthStateChanged, //현재 로그인한 사용자 가져옴
  User,
  signOut, //사용자 로그아웃
} from 'firebase/auth'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  //persist user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //로그인 했을때
        setUser(user)
        setLoading(false)
      } else {
        //로그인 안 했을때
        setUser(null)
        setLoading(true)
        router.push('/login')
      }

      setInitialLoading(false)
    })
  }, [auth])

  //회원가입
  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  //로그인
  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 로그아웃
  const logOut = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const memoValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logOut,
      loading,
      error,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
