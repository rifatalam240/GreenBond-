import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { Link, Outlet, useLocation } from 'react-router'

const API = import.meta.env.VITE_BASE_API || 'https://garden-server-eight.vercel.app/'

const Dashboar = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ total: 0, my: 0 })
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Fetch total items
    Promise.all([
      fetch(`${API}tips`).then((r) => r.json()),
      user?.email
        ? fetch(`${API}tips/mytips?email=${user.email}`).then((r) => r.json())
        : Promise.resolve([]),
    ]).then(([all, mine]) => {
      setStats({ total: all.length, my: mine.length })
      setLoading(false)
    })
  }, [user])

  // Sidebar links
  const links = [
    { to: '/dashboard', label: 'Overview' },
    { to: '/dashboard/allitems', label: 'All Items' },
    { to: '/dashboard/additem', label: 'Add Item' },
    { to: '/dashboard/mytips', label: 'My Items' },
  ]

  // Overview page
  const isOverview = location.pathname === '/dashboard'

  return (
    <div className='flex flex-col md:flex-row min-h-[80vh]'>
      {/* Sidebar */}
      <aside className='w-full md:w-60 bg-green-50 border-r border-green-100 p-4'>
        <div className='mb-6'>
          <div className='font-bold text-green-700 text-lg mb-1'>Dashboard</div>
          <div className='text-xs text-base-content/70'>{user?.email}</div>
        </div>
        <nav className='flex flex-col gap-2'>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`btn btn-sm btn-ghost justify-start ${
                location.pathname === l.to ? 'bg-green-100 font-bold' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-4'>
        {isOverview ? (
          loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h2 className='text-xl font-bold mb-4'>
                👋 Welcome, {user?.displayName || user?.name || 'User'}!
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                <div className='card bg-green-100 border border-green-200 p-4'>
                  <div className='text-2xl font-bold text-green-700'>
                    {stats.total}
                  </div>
                  <div className='text-base-content/70'>Total Items</div>
                </div>
                <div className='card bg-green-50 border border-green-200 p-4'>
                  <div className='text-2xl font-bold text-green-700'>{stats.my}</div>
                  <div className='text-base-content/70'>My Items</div>
                </div>
              </div>
              <div className='card bg-base-100 border p-4'>
                <h3 className='font-semibold mb-2'>Your Info</h3>
                <div>Name: {user?.displayName || user?.name || 'N/A'}</div>
                <div>Email: {user?.email}</div>
              </div>
            </div>
          )
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

export default Dashboar