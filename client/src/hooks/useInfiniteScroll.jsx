import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export default function useInfiniteScroll({ key, fn, params = [] }) {
  const scrollRef = useRef(null)

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: key,
    queryFn: async ({ pageParam }) => {
      return await fn(pageParam, ...params)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '100px'
      }
    )
    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const items = data?.pages.flatMap((page) => page.posts) || []

  return { items, isLoading, isFetchingNextPage, error, scrollRef }
}
