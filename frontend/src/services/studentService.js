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

export const getStudents = async (filters = {}) => {
  try {
    const response = await axiosInstance.get('students/', {
      params: {
        search: filters.search || undefined,
        age: filters.age || undefined,
      },
    })
    const students = getStudentsData(response.data)

    if (!students) {
      return {
        status: 'error',
        data: 'Students API did not return a list.',
      }
    }

    return { status: 'success', data: students }
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
