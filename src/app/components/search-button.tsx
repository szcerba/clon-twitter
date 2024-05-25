'use client'

import React, { useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { SearchIcon } from '@/app/components/icons'
import { search } from '@/app/actions/search-action'
import FollowCard from '@/app/components/follow-card'

export default function SearchButton ({
  userSession,
  sessionUserFollowing
}: {
  userSession: object
  sessionUserFollowing: object
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [usuarios, setUsuarios] = useState()

  return (
    <div>
      <Input
        isClearable
        radius="lg"
        placeholder="Buscar"
        onKeyDown={
          async (e) => {
            if (e.key === 'Enter') {
              setUsuarios(await search(e.target.value))
              onOpen()
              e.target.value = ''
            }
          }
        }
        startContent={
          <SearchIcon
            className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
        }
      />
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Usuarios encontrados</ModalHeader>
              <ModalBody>
                {
                  usuarios.map(seguid => {
                    return (
                      <FollowCard
                        key={seguid.id}
                        id={seguid.id}
                        userFullName={seguid.name}
                        userName={seguid.user_name}
                        avatarUrl={seguid.avatar_url}
                        check={sessionUserFollowing}
                        userSession={userSession}
                      />
                    )
                  })
                }
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
