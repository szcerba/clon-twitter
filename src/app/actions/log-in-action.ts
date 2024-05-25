'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const logIn = async (formDat: FormData) => {
  const email = formDat.get('email')
  const password = formDat.get('password')

  if (email === null || password === null) return

  const supabase = createServerActionClient({ cookies })

  const response = await supabase.auth.signInWithPassword({
    email,
    password
  })

  revalidatePath('/')
}
