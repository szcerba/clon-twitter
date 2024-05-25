import type { Database } from '@/app/types/database'

type PostEntity = Database['public']['Tables']['publicaciones']['Row']
type UserEntity = Database['public']['Tables']['usuarios']['Row']

export type Post = PostEntity & { user: UserEntity }
