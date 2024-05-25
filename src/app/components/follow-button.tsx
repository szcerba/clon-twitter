'use client'

import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import FollowCard from '@/app/components/follow-card'

export function FollowButton ({ seguidos, label, check, userSession }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} className="text-white/40 bg-transparent"><span
        className="text-white font-bold mx-1">{seguidos.length}</span>{label}</Button>
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
              <ModalHeader className="flex flex-col gap-1">{label}</ModalHeader>
              <ModalBody>
                {seguidos.map(seguid => {
                  return (
                    <FollowCard
                      key={seguid.id}
                      id={seguid.id}
                      userFullName={seguid.name}
                      userName={seguid.user_name}
                      avatarUrl={seguid.avatar_url}
                      check={check}
                      userSession={userSession}/>
                  )
                })}
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
    </>
  )
}
