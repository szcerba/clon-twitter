'use client'

import React, { useRef, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import { signIn } from '@/app/actions/sign-in-action'

export function SigninButton () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const formRefVal = useRef<HTMLFormElement>()
  const [errorMensaje, setErrorMensaje] = useState('')

  const handleSignin = async (formData: FormData) => {
    const error = await signIn(formData)
    if (error !== null) {
      setErrorMensaje(error)
    } else {
      formRefVal.current?.reset()
    }
  }

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent">¡Registrate!</Button>
      <Modal
        size="xs"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form ref={formRefVal} action={handleSignin}>
                <ModalHeader className="flex flex-col gap-1">Crea tu cuenta</ModalHeader>
                <ModalBody>
                  <Input
                    className="p-1"
                    autoFocus
                    name="name"
                    id="name"
                    variant="bordered"
                    placeholder="Nombre"
                    isRequired
                  />
                  <Input
                    className="p-1"
                    name="user"
                    id="user"
                    variant="bordered"
                    placeholder="Usuario"
                    isRequired
                  />
                  <Input
                    className="p-1"
                    name="email"
                    id="email"
                    type="email"
                    variant="bordered"
                    placeholder="Correo electrónico"
                    isRequired
                  />
                  <Input
                    className="p-1"
                    name="password"
                    id="password"
                    variant="bordered"
                    placeholder="Contraseña"
                    type="password"
                    isRequired
                  />
                  {errorMensaje}
                </ModalBody>
                <ModalFooter>
                  <Button type="submit">
                    Ingresar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
