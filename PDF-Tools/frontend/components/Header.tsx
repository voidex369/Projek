'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">PDF Tools</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/tools" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
              All Tools
            </Link>
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Log In
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
