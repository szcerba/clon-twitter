'use client'

import { ComposePostButton } from '@/app/components/compose-post-button'
import { addPost } from '@/app/actions/add-post-action'
import React, { useEffect, useRef, useState } from 'react'
import { FollowButton } from '@/app/components/follow-button'
import { Button } from '@nextui-org/button'
import { follow } from '@/app/actions/follow-action'
import { Textarea } from '@nextui-org/input'

export function ComposePost ({
  id,
  name,
  userAvatarUrl,
  seguidos,
  seguidores,
  follower,
  userSession,
  sessionUserFollowing
}: {
  id: string
  name: string
  userAvatarUrl: string
  seguidos: object
  seguidores: object
  follower: string
  userSession: object
  sessionUserFollowing: object
}) {
  const formRef = useRef<HTMLFormElement>()
  const [isFollowed, setIsFollowed] = useState()

  useEffect(() => {
    const idsFollowed = sessionUserFollowing.map(user => user.id)
    setIsFollowed(idsFollowed.includes(id))
  }, [])

  const handlePost = async (formData: FormData) => {
    await addPost(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} action={handlePost} className="flex flex-row p-3 border-b border-white/20">
      <div className="flex flex-1 flex-col gap-y-4">
        <div className="flex justify-center w-full">
          <img className="rounded-full w-10 h-10 object-contain mr-4" src={userAvatarUrl} alt="avatar"/>
          <h1 className="text-3xl">{name}</h1>
        </div>
        {
          follower && userSession.id !== id &&
          <div className="flex justify-center">
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
          </div>
        }
        <div className="flex justify-around m-4">
          <FollowButton seguidos={seguidos} label="Siguiendo" check={sessionUserFollowing} userSession={userSession}/>
          <FollowButton seguidos={seguidores} label="Seguidores" check={sessionUserFollowing}
                        userSession={userSession}/>
        </div>
        {!follower &&
          <>
          <Textarea
            isRequired
            name="content"
            id="content"
            rows={4}
            maxLength={280}
            className="w-full text-xl bg-black placeholder-gray-500 p-2"
            placeholder="¿Que estas pensando?"
          />
            <ComposePostButton/>
          </>
        }
      </div>
    </form>
  )
}
