'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GitHubIcon } from '@/app/components/icons'
import { useRouter } from 'next/navigation'
import { type Session } from '@supabase/supabase-js'
import { Button } from '@nextui-org/button'

export function AuthButtonClient ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
      <header>
          {
            session === null
              ? (
                <button type="button" onClick={handleSignIn}
                        className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
                  <GitHubIcon/>
                  Iniciar sesión con Github
                </button>
                )
              : <Button type="button" onClick={handleSignOut}>Cerrar sesión</Button>
          }

      </header>
  )
}
