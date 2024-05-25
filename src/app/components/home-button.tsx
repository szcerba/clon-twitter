'use client'

import Link from 'next/link'
import { HomeIcon } from '@/app/components/icons'

export function HomeButton () {
  return (
    <div className="flex gap-4 items-center mb-4 ">
      <Link href="/">
        <HomeIcon/>
      </Link>
    </div>
  )
}
