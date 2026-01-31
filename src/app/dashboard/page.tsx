import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from './actions'
import { LayoutDashboard, LogOut, User } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white shadow-sm dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <LayoutDashboard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
                <form action={signout}>
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                    >
                        <LogOut className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Sign out
                    </button>
                </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Welcome back
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                    <User className="h-full w-full text-gray-300 dark:text-gray-400" />
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                    User Information
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                    You are logged in as <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
