'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  FileText,
  FileDown,
  FileUp,
  FileInput,
  FileOutput,
  Archive,
  Scissors,
  FileSearch,
  Image as ImageIcon,
  FileType,
  Loader2
} from 'lucide-react'

interface Tool {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

const tools: Tool[] = [
  // Conversion Tools
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF files to editable DOC/DOCX documents',
    icon: <FileText className="w-8 h-8" />,
    href: '/tools/convert/pdf-to-word',
    color: 'bg-blue-500'
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert DOC/DOCX files to PDF format',
    icon: <FileDown className="w-8 h-8" />,
    href: '/tools/convert/word-to-pdf',
    color: 'bg-indigo-500'
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Extract all pages as PNG or JPG images',
    icon: <ImageIcon className="w-8 h-8" />,
    href: '/tools/convert/pdf-to-image',
    color: 'bg-purple-500'
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Combine JPG/PNG images into a single PDF',
    icon: <FileUp className="w-8 h-8" />,
    href: '/tools/convert/image-to-pdf',
    color: 'bg-pink-500'
  },
  {
    id: 'pdf-to-txt',
    title: 'PDF to TXT',
    description: 'Extract raw text content from PDF files',
    icon: <FileSearch className="w-8 h-8" />,
    href: '/tools/convert/pdf-to-txt',
    color: 'bg-gray-500'
  },
  {
    id: 'txt-to-pdf',
    title: 'TXT to PDF',
    description: 'Convert plain text files to PDF documents',
    icon: <FileOutput className="w-8 h-8" />,
    href: '/tools/convert/txt-to-pdf',
    color: 'bg-green-500'
  },
  // Basic PDF Tools
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDFs into one document. Option to compress after merge.',
    icon: <Archive className="w-8 h-8" />,
    href: '/tools/merge',
    color: 'bg-orange-500'
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract pages or split into individual files',
    icon: <Scissors className="w-8 h-8" />,
    href: '/tools/split',
    color: 'bg-red-500'
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce file size while maintaining quality',
    icon: <FileType className="w-8 h-8" />,
    href: '/tools/compress',
    color: 'bg-teal-500'
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">PDF Tools</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-gray-600 hover:text-primary-600 transition-colors">
                All Tools
              </Link>
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary-600 font-medium">
                Log In
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            PDF Tools That Work For You
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Edit, convert, compress, merge, split, and secure PDFs online—quickly and safely.
            All tools are 100% free with no installation required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#tools"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Start Converting
            </Link>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Explore All Tools
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Privacy-first</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>256-bit encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Auto-delete after 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Works on any device</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All PDF Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of free PDF tools. Simple, fast, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="group relative bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${tool.color} transform group-hover:scale-y-100 scale-y-0 transition-transform origin-top`} />
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${tool.color} bg-opacity-10 text-primary-600 mb-4 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Try Now</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose PDF Tools?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Average processing time: 15 seconds. Optimized for speed without compromising quality.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                256-bit TLS encryption. All files are automatically deleted after 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple drag & drop interface. No installation, no registration required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-primary-400" />
                <span className="text-lg font-bold text-white">PDF Tools</span>
              </div>
              <p className="text-sm">
                Free, secure, and easy-to-use PDF manipulation tools.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Convert</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/convert/pdf-to-word" className="hover:text-primary-400 transition-colors">PDF to Word</Link></li>
                <li><Link href="/tools/convert/word-to-pdf" className="hover:text-primary-400 transition-colors">Word to PDF</Link></li>
                <li><Link href="/tools/convert/pdf-to-image" className="hover:text-primary-400 transition-colors">PDF to Image</Link></li>
                <li><Link href="/tools/convert/image-to-pdf" className="hover:text-primary-400 transition-colors">Image to PDF</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Organize</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/merge" className="hover:text-primary-400 transition-colors">Merge PDF</Link></li>
                <li><Link href="/tools/split" className="hover:text-primary-400 transition-colors">Split PDF</Link></li>
                <li><Link href="/tools/compress" className="hover:text-primary-400 transition-colors">Compress PDF</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 PDF Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
