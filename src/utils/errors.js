export const FETCH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const ERROR_TYPES = {
  NOT_FOUND: 'not_found',
  RATE_LIMIT: 'rate_limit',
  NETWORK: 'network',
  UNKNOWN: 'unknown',
}

/**
 * @param {object} error
 * @param {string} [resourceLabel]
 */
export function mapApiError(error, resourceLabel = 'resource') {
  const status = error?.status
  const message = error?.message?.toLowerCase() ?? ''

  if (status === 404) {
    return {
      type: ERROR_TYPES.NOT_FOUND,
      message: `The requested ${resourceLabel} was not found on GitHub.`,
    }
  }

  if (
    status === 403 &&
    (message.includes('rate limit') || message.includes('abuse'))
  ) {
    return {
      type: ERROR_TYPES.RATE_LIMIT,
      message:
        'GitHub API rate limit reached. Please wait a moment or add a token in your .env file.',
    }
  }

  if (
    status === null ||
    message.includes('network') ||
    message.includes('timeout')
  ) {
    return {
      type: ERROR_TYPES.NETWORK,
      message: 'Unable to reach GitHub. Check your connection and try again.',
    }
  }

  return {
    type: ERROR_TYPES.UNKNOWN,
    message: error?.message || 'Something went wrong. Please try again.',
  }
}
