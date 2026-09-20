import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createStudent,
  getStudentById,
  updateStudent,
} from '../services/studentService'

const emptyStudent = {
  name: '',
  email: '',
  age: '',
  phone: '',
}

export const useStudentForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = useMemo(() => Boolean(id), [id])
  const [formData, setFormData] = useState(emptyStudent)
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(isEditMode)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isEditMode) {
      return
    }

    const fetchStudent = async () => {
      setLoading(true)
      const response = await getStudentById(id)

      if (response.status === 'success') {
        const student = response.data
        setFormData({
          name: student.name || '',
          email: student.email || '',
          age: student.age?.toString() || '',
          phone: student.phone || '',
        })
      } else {
        toast.error(response.data)
      }

      setLoading(false)
    }

    fetchStudent()
  }, [id, isEditMode])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setFieldErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFieldErrors({})

    const payload = {
      ...formData,
      age: Number(formData.age),
    }

    const response = isEditMode
      ? await updateStudent(id, payload)
      : await createStudent(payload)

    if (response.status === 'success') {
      toast.success(isEditMode ? 'Student updated' : 'Student created')
      navigate(`/students/${response.data.id}`)
    } else {
      const data = response.errors

      if (data && typeof data === 'object' && !data.detail) {
        setFieldErrors(data)
      }

      toast.error(response.data)
    }

    setSubmitting(false)
  }

  return {
    formData,
    fieldErrors,
    loading,
    submitting,
    isEditMode,
    handleChange,
    handleSubmit,
  }
}
