'use client'

import getUserDebates from '@/actions/get-user-debates'
import { TUserDebates } from '@/lib/prisma-types'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Container, Grid } from '@mantine/core'
import { Debate } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import DebateCard from './DebateCard'

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

  if (!!user && !!user.sub && user.sub.length && userData) {
    return debatesData.length ? (
      <section>
        <Container my="md">
          <Grid>
            {debatesData.map((debate: Debate) =>
              <Grid.Col span={{ base: 12, md: 4, sm: 5, xs: 6 }} key={debate.id}>
                <DebateCard
                  creatorSub={debate.creatorSub}
                  id={debate.id}
                  opponentSub={debate.opponentSub}
                  status={debate.status}
                  topic={debate.topic}
                  userSub={user.sub as string}
                />
              </Grid.Col>
            )}
          </Grid>
        </Container>
      </section>
    ) : 'No debates found'
  }

  // TODO: redirect to signin/register flow
  return user ? 'Loading debates....' : 'Please login'
}
