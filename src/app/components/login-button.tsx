'use client'

import React, { useRef } from 'react'
import { Button, Input } from '@nextui-org/react'
import { logIn } from '@/app/actions/log-in-action'

export function LoginButton () {
  const formRef = useRef<HTMLFormElement>()

  const handleLogin = async (formData: FormData) => {
    await logIn(formData)
  }

  return (
    <>
      <form ref={formRef} action={handleLogin}>
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 mb-4 justify-center">
          <Input type="email" name="email" size="sm" label="Email"/>
          <Input type="password" name="password" size="sm" label="Contraseña"/>
        </div>
        <div className="flex gap-4 items-center mb-4 ">
          <Button type="submit" size="sm" className="w-full">
            Ingresar
          </Button>
        </div>
      </form>
    </>
  )
}
