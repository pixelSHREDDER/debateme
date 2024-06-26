'use client'

import getUserDebates from '@/actions/get-user-debates'
import { TUserDebates } from '@/lib/prisma-types'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Debate } from '@prisma/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function DebateList() {
  const { user, error, isLoading } = useUser()
  const [userData, setUserData] = useState<TUserDebates | null>(null)
  const [debatesData, setDebatesData] = useState<Debate[]>([])

  useEffect(() => {
    async function refreshData() {
      if (!!user && !!user.sub) {
        const newUserData = await getUserDebates(user.sub)
        let newDebatesData: Debate[] = []

        setUserData(newUserData)

        if (newUserData?.debatesCreated) {
          newDebatesData = [...newDebatesData, ...newUserData.debatesCreated]
        }
        if (newUserData?.debatesOpposed) {
          newDebatesData = [...newDebatesData, ...newUserData.debatesOpposed]
        }

        setDebatesData(newDebatesData)
      }
    }

    refreshData()
  }, [user])

  if (isLoading) { return 'loading user...' }

  if (error) { return JSON.stringify(error) }

  if (userData) {
    return debatesData.length ? (
      <section>
        {debatesData.map((debate: Debate) =>
          <Link key={debate.id} href={`/debate/${debate.id}`}>{debate.topic}</Link>
        )}
      </section>
    ) : 'No debates found'
  }

  return user ? 'Loading debates....' : 'Please login'
}