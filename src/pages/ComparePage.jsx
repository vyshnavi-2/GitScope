import { useState } from 'react'
import { GitCompare } from 'lucide-react'
import { CompareResults, CompareSearch } from '../components/compare'
import { Button, Container, EmptyState, ErrorState, PageHeader, PageShell } from '../components/common'
import {
  isValidComparePair,
  normalizeCompareUsername,
  useDeveloperCompare,
} from '../hooks/useDeveloperCompare'

export default function ComparePage() {
  const [usernameA, setUsernameA] = useState('')
  const [usernameB, setUsernameB] = useState('')
  const [compareTarget, setCompareTarget] = useState({ a: '', b: '' })
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const hasBothInputs =
    normalizeCompareUsername(usernameA).length > 0 &&
    normalizeCompareUsername(usernameB).length > 0

  const isSameUser =
    hasBothInputs &&
    !isValidComparePair(usernameA, usernameB)

  const shouldCompare =
    hasSubmitted &&
    isValidComparePair(compareTarget.a, compareTarget.b)

  const {
    developerA,
    developerB,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useDeveloperCompare(compareTarget.a, compareTarget.b, shouldCompare)

  const handleCompare = () => {
    const a = normalizeCompareUsername(usernameA)
    const b = normalizeCompareUsername(usernameB)

    if (!isValidComparePair(a, b)) return

    setCompareTarget({ a, b })
    setHasSubmitted(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleCompare()
    }
  }

  return (
    <PageShell onKeyDown={handleKeyDown}>
      <Container className="space-y-8">
        <PageHeader
          eyebrow="Head to Head"
          icon={GitCompare}
          title="Developer Comparison"
          description="Enter two GitHub usernames and compare followers, repositories, stars, languages, and account age side by side."
        />

        <CompareSearch
          usernameA={usernameA}
          usernameB={usernameB}
          onChangeA={(value) => {
            setUsernameA(value)
            setHasSubmitted(false)
          }}
          onChangeB={(value) => {
            setUsernameB(value)
            setHasSubmitted(false)
          }}
          onClearA={() => {
            setUsernameA('')
            setCompareTarget({ a: '', b: '' })
            setHasSubmitted(false)
          }}
          onClearB={() => {
            setUsernameB('')
            setCompareTarget({ a: '', b: '' })
            setHasSubmitted(false)
          }}
          isLoading={isLoading}
          isSameUser={isSameUser}
          action={
            <Button
              onClick={handleCompare}
              disabled={!hasBothInputs || isSameUser || isLoading}
              size="lg"
              className="w-full sm:w-auto"
            >
              <GitCompare className="h-4 w-4" aria-hidden="true" />
              Compare Developers
            </Button>
          }
        />

        {!hasSubmitted && !isLoading && (
          <EmptyState
            icon={GitCompare}
            title="Enter two developers"
            description="Type two different GitHub usernames above, then click Compare Developers."
          />
        )}

        {hasSubmitted && isSameUser && !isLoading && (
          <EmptyState
            icon={GitCompare}
            title="Choose two different developers"
            description="Enter two unique GitHub usernames to run a comparison."
          />
        )}

        {isError && (
          <ErrorState error={error} title="Comparison failed" />
        )}

        {isSuccess && developerA && developerB && (
          <CompareResults
            developerA={developerA}
            developerB={developerB}
          />
        )}
      </Container>
    </PageShell>
  )
}
