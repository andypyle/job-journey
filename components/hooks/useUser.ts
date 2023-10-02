import { useCallback, useEffect, useState } from 'react'

export const useUser = (user?: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchedUser, setFetchedUser] = useState<any>({})

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
    })
  }, [])

  return {
    loading,
    logout,
    user: user ?? fetchedUser,
  }
}
