import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from '@/app/components/auth-button-server'
import { redirect } from 'next/navigation'
import { PostList } from '@/app/components/post-list'
import { type Database } from '@/app/types/database'
import { ComposePost } from '@/app/components/compose-post'
import { HomeButton } from '@/app/components/home-button'
import SearchButton from '@/app/components/search-button'

export default async function Follower ({ follower }: { follower: string }) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('*')
    .eq(follower !== undefined ? 'user_name' : 'id', follower || session.user.id)
    .single()

  const { data: publicaciones } =
    (follower === undefined)
      ? await supabase
        .rpc('custom_select_post')
        // .from('publicaciones')
        // .select('*, user:usuarios(*)')
        // .order('created_at', { ascending: false })
      : await supabase
        .from('publicaciones')
        .select('*, user:usuarios(*)')
        .or('user_id.eq.' + usuario.id)
        .order('created_at', { ascending: false })

  async function getFollowers (userId: string, follow: string) {
    const { data: followers, error: followersError } = await supabase
      .from('seguidores')
      .select()
      .eq(follow === 'siguiendo' ? 'id_user' : 'id_follow', userId)

    if (followersError) {
      console.error('Error fetching followers:', followersError)
      return null
    }

    const followerIds = followers.map((f: any) => follow === 'siguiendo' ? f.id_follow : f.id_user)

    const { data: users, error: usersError } = await supabase
      .from('usuarios')
      .select('id, name, avatar_url, user_name')
      .in('id', followerIds)
      .order('name', { ascending: true })

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return null
    }
    return users
  }

  const sessionUserFollowing = await getFollowers(session.user.id, 'siguiendo')
  const seguidos = await getFollowers(usuario.id, 'siguiendo')
  const seguidores = await getFollowers(usuario.id, 'seguidores')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen'>

        <div className="flex justify-between m-4">
          <HomeButton/>
          <SearchButton
            userSession={session.user}
            sessionUserFollowing={sessionUserFollowing}
          />
        </div>
        <ComposePost
          id={usuario.id}
          name={usuario.name}
          userAvatarUrl={usuario.avatar_url}
          seguidos={seguidos}
          seguidores={seguidores}
          follower={follower}
          userSession={session.user}
          sessionUserFollowing={sessionUserFollowing}
        />
        <PostList publicaciones={publicaciones}/>
      </section>
      <AuthButtonServer/>
    </main>
  )
}
