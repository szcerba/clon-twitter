'use client'
import { Card, CardHeader, Avatar } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { follow } from '@/app/actions/follow-action'

export default function FollowCard ({
  id,
  userFullName,
  userName,
  avatarUrl,
  check,
  userSession
}: {
  id: string
  userFullName: string
  userName: string
  avatarUrl: string
  check: object
  userSession: object
}) {
  const [isFollowed, setIsFollowed] = useState(false)
  const [isSessionUser] = useState(userSession.id === id)

  useEffect(() => {
    if (check === undefined) return
    const idsFollowed = check.map(user => user.id)
    setIsFollowed(idsFollowed.includes(id))
  }, [])

  return (
    <Card
      className="shadow-none bg-transparent hover:bg-slate-800 transition border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-x-2 w-full justify-between">
          <Link href={`/${userName}`}>
            <div className="flex gap-x-2">
                <Avatar radius="full" size="md" src={avatarUrl}/>
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
                <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
              </div>
            </div>
          </Link>
          {
            check && !isSessionUser &&
            <Button
              className={isFollowed ? 'bg-transparent text-foreground border-default-200' : ''}
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? 'bordered' : 'solid'}
              onPress={async () => {
                await follow(isFollowed, id)
                setIsFollowed(!isFollowed)
              }}
            >
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          }
        </div>
      </CardHeader>
    </Card>
  )
}
