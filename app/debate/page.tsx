import DebateList from '@/components/Debate/DebateList'
import NewDebate from '@/components/Debate/NewDebate'

export default function Debates() {
  return (
    <>
      <h1>Debates</h1>
      <h2>Your Debates</h2>
      <DebateList />
      <h2>Create New Debate</h2>
      <NewDebate />
    </>
  )
}
