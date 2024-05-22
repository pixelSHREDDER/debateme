'use client'

import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"

export default function TopBar() {
  const { error, isLoading, user } = useUser()

const userChunk = () => {
  if (isLoading) return 'loading user....'
  if (error) return 'error'
  if (user) return (
    <>
      <a href="/user/profile">Hi, {user.name}!</a>&nbsp;|&nbsp;<a href="/api/auth/logout">Logout</a>
    </>
  )
  return <a href="/api/auth/login">Login</a>
}

  return (
    <nav className="w-full h-8 sticky bg-black text-white mb-1 p-1 z-50">
      <Link href="/">Home</Link>&nbsp;|&nbsp;
      <Link href="/debate">Debates</Link>&nbsp;|&nbsp;
      {userChunk()}
    </nav>
  )
}