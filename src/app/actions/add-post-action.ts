'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const addPost = async (formDat: FormData) => {
  const content = formDat.get('content')

  if (content === null) return
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
  await supabase.from('publicaciones').insert({
    content,
    user_id: user.id
  })
  revalidatePath('/')
}
