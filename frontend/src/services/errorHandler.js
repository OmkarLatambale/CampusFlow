export const getErrorMessage = (error, fallback) => {
  const data = error.response?.data

  if (typeof data === 'string') {
    return data
  }

  if (data?.message) {
    return data.message
  }

  if (data?.detail) {
    return data.detail
  }

  if (data && typeof data === 'object') {
    return Object.entries(data)
      .map(([field, messages]) => {
        const text = Array.isArray(messages) ? messages.join(', ') : messages
        return `${field}: ${text}`
      })
      .join(' | ')
  }

  return fallback
}
