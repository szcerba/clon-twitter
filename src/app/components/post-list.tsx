import PostCard from '@/app/components/post-card'
import { type Post } from '@/app/types/posts'

export function PostList ({ publicaciones }: { publicaciones: Post[] }) {
  return (
    <>
      {
        publicaciones?.map(publicacion => {
          const {
            id,
            user,
            content
          } = publicacion

          const {
            user_name: userName,
            name: userFullName,
            avatar_url: avatarUrl
          } = user !== undefined ? user : publicacion

          return (<PostCard
            content={content}
            key={id}
            userName={userName}
            userFullName={userFullName}
            avatarUrl={avatarUrl}
          />)
        })
      }
    </>
  )
}
