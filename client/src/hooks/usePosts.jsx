import Post from '@/api/post'
import { useState, useEffect } from 'react'

export default function usePosts() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getPosts = async () => {
    try {
      setLoading(true)
      const res = await Post.getAll(page)
      if (res.posts) {
        setPosts((prevPosts) => [...prevPosts, ...res.posts])
      }
      console.log(res)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
    console.log('POSTS')
  }, [page])

  return { posts, loading, error, setPage }
}
