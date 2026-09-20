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

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    setError('')

    const response = await getStudents()

    if (response.status === 'success') {
      setStudents(response.data)
    } else {
      setError(response.data)
      toast.error(response.data)
    }

    setLoading(false)
  }, [])

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
    fetchStudents,
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
