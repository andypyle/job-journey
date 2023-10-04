import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useUser = (user?: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchedUser, setFetchedUser] = useState<any>({})
  const { replace } = useRouter()

  useEffect(() => {
    if (!user) {
      setLoading(true)
      fetch('/api/auth/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((d) => d.json())
        .then((u) => {
          setFetchedUser(u)
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = useCallback(() => {
    setLoading(true)
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setLoading(false)
      replace('/login')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    logout,
    user: user ?? fetchedUser,
  }
}
