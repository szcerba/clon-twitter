'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const signIn = async (formDat: FormData) => {
  const name = formDat.get('name')
  const username = formDat.get('user')
  const email = formDat.get('email')
  const password = formDat.get('password')

  if (name === null || username === null || email === null || password === null) return

  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: '/'
    }
  })
  console.log(error)
  if (error !== null) return error.code
  if (data.user === null) return

  await supabase.from('usuarios').update({ name, user_name: username, avatar_url: 'https://www.gravatar.com/avatar/?d=mp' }).eq('id', data.user.id).select()

  revalidatePath('/')
}
