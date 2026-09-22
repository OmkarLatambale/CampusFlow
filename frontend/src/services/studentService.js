import axiosInstance from './axiosInstance'
import { getErrorMessage } from './errorHandler'

const getStudentsData = (data) => {
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.results)) {
    return data.results
  }

  if (Array.isArray(data?.data)) {
    return data.data
  }

  if (Array.isArray(data?.students)) {
    return data.students
  }

  return null
}

const getPageFromUrl = (url) => {
  if (!url) {
    return null
  }

  const parsedUrl = new URL(url, window.location.origin)
  return Number(parsedUrl.searchParams.get('page') || 1)
}

const getPaginationData = (data, currentPage) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      count: Array.isArray(data) ? data.length : 0,
      next: null,
      previous: null,
      currentPage,
    }
  }

  return {
    count: data.count || 0,
    next: data.next,
    previous: data.previous,
    currentPage,
    nextPage: getPageFromUrl(data.next),
    previousPage: getPageFromUrl(data.previous),
  }
}

export const getStudents = async (filters = {}) => {
  try {
    const response = await axiosInstance.get('students/', {
      params: {
        search: filters.search || undefined,
        page: filters.page || undefined,
      },
    })
    const students = getStudentsData(response.data)

    if (!students) {
      return {
        status: 'error',
        data: 'Students API did not return a list.',
      }
    }

    return {
      status: 'success',
      data: students,
      pagination: getPaginationData(response.data, filters.page || 1),
    }
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to fetch students.')
    return { status: 'error', data: message }
  }
}

export const getStudentById = async (id) => {
  try {
    const response = await axiosInstance.get(`students/${id}/`)

    return { status: 'success', data: response.data }
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to fetch student details.')
    return { status: 'error', data: message }
  }
}

export const createStudent = async (student) => {
  try {
    const response = await axiosInstance.post('students/', student)

    return { status: 'success', data: response.data }
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to create student.')
    return {
      status: 'error',
      data: message,
      errors: error.response?.data,
    }
  }
}

export const updateStudent = async (id, student) => {
  try {
    const response = await axiosInstance.put(`students/${id}/`, student)

    return { status: 'success', data: response.data }
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to update student.')
    return {
      status: 'error',
      data: message,
      errors: error.response?.data,
    }
  }
}

export const deleteStudent = async (id) => {
  try {
    await axiosInstance.delete(`students/${id}/`)

    return { status: 'success', data: null }
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to delete student.')
    return { status: 'error', data: message }
  }
}
