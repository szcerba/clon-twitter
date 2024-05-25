'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const follow = async (isFollow: boolean, id: string) => {
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (isFollow) {
    await supabase
      .from('seguidores')
      .delete()
      .match({
        id_user: user.id,
        id_follow: id
      })
  } else {
    const response = await supabase
      .from('seguidores')
      .insert({
        id_user: user.id,
        id_follow: id
      })
  }
  revalidatePath('/')
}
