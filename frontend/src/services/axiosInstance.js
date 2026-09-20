import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_BASE_URL

const normalizedApiUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const axiosInstance = axios.create({
  baseURL: normalizedApiUrl,
  headers: {
    Accept: 'application/json', 
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...getAuthHeaders(),
  }

  return config
})

export default axiosInstance
