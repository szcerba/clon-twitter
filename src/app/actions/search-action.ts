'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const search = async (value: string) => {
  const supabase = createServerActionClient({ cookies })

  const { data } = await supabase
    .from('usuarios')
    .select()
    .or('name.ilike.%' + value + '%,user_name.ilike.%' + value + '%')

  return data
}
