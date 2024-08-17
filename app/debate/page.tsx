import DebateList from '@/components/Debates/DebateList'
import NewDebate from '@/components/Debates/NewDebate'

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
