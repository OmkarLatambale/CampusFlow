import { Link, useParams } from 'react-router-dom'
import { useStudentDetails } from '../hooks/useStudents'

function StudentDetailsPage() {
  const { id } = useParams()
  const { student, loading, error } = useStudentDetails(id)

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
          {loading && (
            <p className="rounded-md bg-slate-100 p-4 text-sm text-slate-600">
              Loading student...
            </p>
          )}

          {!loading && error && (
            <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && student && (
            <>
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-cyan-700">
                    Student #{student.id}
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-normal">
                    {student.name}
                  </h1>
                </div>
                <Link
                  to={`/students/${student.id}/edit`}
                  className="inline-flex justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Edit student
                </Link>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-slate-200 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </dt>
                  <dd className="mt-2 text-sm text-slate-900">
                    {student.email}
                  </dd>
                </div>
                <div className="rounded-md border border-slate-200 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Age
                  </dt>
                  <dd className="mt-2 text-sm text-slate-900">
                    {student.age}
                  </dd>
                </div>
                <div className="rounded-md border border-slate-200 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Phone
                  </dt>
                  <dd className="mt-2 text-sm text-slate-900">
                    {student.phone}
                  </dd>
                </div>
              </dl>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default StudentDetailsPage
