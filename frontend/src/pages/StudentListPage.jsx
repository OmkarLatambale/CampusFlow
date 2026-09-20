import { Link } from 'react-router-dom'
import { useStudents } from '../hooks/useStudents'

function StudentListPage() {
  const { students, loading, error, removeStudent } = useStudents()
  const studentList = Array.isArray(students) ? students : []

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cyan-700">
              Django CRUD Tester
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              Students
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Create, view, update, and delete records from your Django REST API.
            </p>
          </div>

          <Link
            to="/students/new"
            className="inline-flex items-center justify-center rounded-md  px-4 py-2 text-sm font-medium text-white bg-black"
          >
            Add student
          </Link>
        </div>

        {loading && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Loading students...
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && studentList.length === 0 && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold">No students yet</h2>
            <p className="mt-2 text-sm text-slate-600">
              Add your first student to test the create API.
            </p>
            <Link
              to="/students/new"
              className="mt-5 inline-flex rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Add student
            </Link>
          </div>
        )}

        {!loading && !error && studentList.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Name</th>
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Age</th>
                    <th className="px-5 py-3 font-semibold">Phone</th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentList.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {student.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {student.email}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {student.age}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {student.phone}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/students/${student.id}`}
                            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            View
                          </Link>
                          <Link
                            to={`/students/${student.id}/edit`}
                            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeStudent(student.id)}
                            className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default StudentListPage
