import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import StudentDetailsPage from './pages/StudentDetailsPage'
import StudentFormPage from './pages/StudentFormPage'
import StudentListPage from './pages/StudentListPage'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/students" replace />} />
        <Route path="/students" element={<StudentListPage />} />
        <Route path="/students/new" element={<StudentFormPage key="new" />} />
        <Route path="/students/:id" element={<StudentDetailsPage />} />
        <Route
          path="/students/:id/edit"
          element={<StudentFormPage key="edit" />}
        />
        <Route
          path="*"
          element={
            <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
              <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  404
                </p>
                <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
                <a
                  href="/students"
                  className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Go to students
                </a>
              </div>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App
