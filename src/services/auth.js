import { apiFetching } from './apiFetching'
const BASE_ENDPOINT = 'auth'

export const login = async ({ email, password }) => {
  return await apiFetching({
    endpoint: `${BASE_ENDPOINT}/login`,
    options: {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }
  })
}

export const logout = async () => {
  return await apiFetching({
    endpoint: `${BASE_ENDPOINT}/logout`,
    options: {
      method: 'POST',
      credentials: 'include'
    }
  })
}

export const checkAuth = async () => {
  try {
    const data = await apiFetching({
      endpoint: `${BASE_ENDPOINT}/check-auth`,
      options: {
        credentials: 'include'
      }
    })
    return data
  } catch (error) {
    return null
  }
}

export const changePassword = async ({ oldPassword, newPassword }) => {
  return await apiFetching({
    endpoint: `${BASE_ENDPOINT}/change-password`,
    options: {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
      credentials: 'include'
    }
  })
}
