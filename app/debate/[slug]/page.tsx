import Debate from '@/components/Debate/Debate'

interface IDebate {
  params: { slug: string }
}

export default async function DebatePage({ params }: IDebate) {
  return <Debate debateId={parseInt(params.slug, 10)} />
}
