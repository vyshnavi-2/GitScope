import { useParams } from 'react-router-dom'

export function useActiveUsername() {
  const { username } = useParams()
  return username ?? null
}
