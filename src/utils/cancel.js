export function isRequestCanceled(error) {
  const original = error?.originalError ?? error
  return (
    original?.code === 'ERR_CANCELED' ||
    original?.name === 'CanceledError' ||
    original?.__CANCEL__ === true
  )
}
