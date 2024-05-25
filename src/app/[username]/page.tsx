import type { NextRequest } from 'next/server'
import Home from '@/app/page'

export default async function HomeClient (req: NextRequest) {
  return <Home follower={req.params.username}/>
}
