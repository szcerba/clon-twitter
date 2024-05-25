import { AuthButtonServer } from '@/app/components/auth-button-server'
import { SigninButton } from '@/app/components/signin-button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/app/types/database'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginButton } from '@/app/components/login-button'

export default async function Login () {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session !== null) {
    redirect('/')
  }

  return (
    <section className="grid place-content-center min-h-screen">
      <h1 className="text-xl font-bold mb-4 flex justify-center">Inicia Sesión en Twitter</h1>
      <div className="flex justify-center mb-4">
        <AuthButtonServer/>
      </div>
      <span className="flex justify-center mb-4">o</span>
      <LoginButton/>
      <div className="flex gap-4 items-center">
        ¿No tienes cuenta? <SigninButton/>
      </div>
    </section>
  )
}
