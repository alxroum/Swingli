import React from 'react'
import Header from './Header'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  )
}

export default Layout
