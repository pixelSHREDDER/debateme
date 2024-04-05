'use client'

import { addTurn } from '@/actions/add-turn';

export default function NewTurn(debateId: string) {
  return (
    <form action={data => addTurn(data, debateId)}>
      <button type="submit">Finish Your Turn</button>
    </form>
  )
}