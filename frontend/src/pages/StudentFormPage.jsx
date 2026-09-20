import { Link } from 'react-router-dom'
import { useStudentForm } from '../hooks/useStudentForm'

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Jane Doe',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'jane@example.com',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: '21',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '9876543210',
  },
]

const getFieldError = (error) => {
  if (Array.isArray(error)) {
    return error.join(', ')
  }

  return error
}

function StudentFormPage() {
  const {
    formData,
    fieldErrors,
    loading,
    submitting,
    isEditMode,
    handleChange,
    handleSubmit,
  } = useStudentForm()

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <Link
          to="/students"
          className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
        >
          Back to students
        </Link>

        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-normal">
            {isEditMode ? 'Edit student' : 'Add student'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill the same fields your Django serializer expects.
          </p>

          {loading ? (
            <div className="mt-8 rounded-md bg-slate-100 p-4 text-sm text-slate-600">
              Loading form...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    min={field.name === 'age' ? '1' : undefined}
                    maxLength={field.name === 'phone' ? 10 : undefined}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                  />
                  {fieldErrors[field.name] && (
                    <p className="mt-2 text-sm text-red-600">
                      {getFieldError(fieldErrors[field.name])}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Link
                  to="/students"
                  className="inline-flex justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {submitting
                    ? 'Saving...'
                    : isEditMode
                      ? 'Update student'
                      : 'Create student'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default StudentFormPage
