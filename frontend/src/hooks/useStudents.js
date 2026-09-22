import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  deleteStudent,
  getStudentById,
  getStudents,
} from '../services/studentService'

export const useStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  })
  const [filters, setFilters] = useState({
    search: '',
    page: 1,
  })

  const fetchStudents = useCallback(async (activeFilters = filters) => {
    setLoading(true)
    setError('')

    const response = await getStudents(activeFilters)

    if (response.status === 'success') {
      setStudents(response.data)
      setPagination(response.pagination)
    } else {
      setError(response.data)
      toast.error(response.data)
    }

    setLoading(false)
  }, [filters])

  const updateFilter = useCallback((name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }, [])

  const applyFilters = useCallback(
    (event) => {
      event.preventDefault()
      const firstPageFilters = {
        ...filters,
        page: 1,
      }

      setFilters(firstPageFilters)
      fetchStudents(firstPageFilters)
    },
    [fetchStudents, filters],
  )

  const clearFilters = useCallback(() => {
    const emptyFilters = {
      search: '',
      page: 1,
    }

    setFilters(emptyFilters)
    fetchStudents(emptyFilters)
  }, [fetchStudents])

  const changePage = useCallback(
    (page) => {
      if (!page || page === filters.page) {
        return
      }

      const nextFilters = {
        ...filters,
        page,
      }

      setFilters(nextFilters)
      fetchStudents(nextFilters)
    },
    [fetchStudents, filters],
  )

  const removeStudent = useCallback(async (id) => {
    const response = await deleteStudent(id)

    if (response.status === 'success') {
      setStudents((current) => current.filter((student) => student.id !== id))
      toast.success('Student deleted')
    } else {
      toast.error(response.data)
    }
  }, [])

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true)
      setError('')

      const response = await getStudents()

      if (response.status === 'success') {
        setStudents(response.data)
        setPagination(response.pagination)
      } else {
        setError(response.data)
        toast.error(response.data)
      }

      setLoading(false)
    }

    loadStudents()
  }, [])

  return {
    students,
    loading,
    error,
    pagination,
    filters,
    fetchStudents,
    updateFilter,
    applyFilters,
    clearFilters,
    changePage,
    removeStudent,
  }
}

export const useStudentDetails = (id) => {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true)
      setError('')

      const response = await getStudentById(id)

      if (response.status === 'success') {
        setStudent(response.data)
      } else {
        setError(response.data)
        toast.error(response.data)
      }

      setLoading(false)
    }

    fetchStudent()
  }, [id])

  return {
    student,
    loading,
    error,
  }
}
