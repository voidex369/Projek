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
  FileType
} from 'lucide-react'

const tools = [
  {
    title: 'PDF to Word',
    desc: 'Convert PDF to editable DOC/DOCX',
    icon: FileText,
    color: 'bg-blue-500',
    href: '/tools/convert/pdf-to-word'
  },
  {
    title: 'Word to PDF',
    desc: 'Convert DOC/DOCX to PDF',
    icon: FileDown,
    color: 'bg-indigo-500',
    href: '/tools/convert/word-to-pdf'
  },
  {
    title: 'PDF to Image',
    desc: 'Extract pages as PNG/JPG',
    icon: ImageIcon,
    color: 'bg-purple-500',
    href: '/tools/convert/pdf-to-image'
  },
  {
    title: 'Image to PDF',
    desc: 'Combine images into PDF',
    icon: FileUp,
    color: 'bg-pink-500',
    href: '/tools/convert/image-to-pdf'
  },
  {
    title: 'PDF to TXT',
    desc: 'Extract text from PDF',
    icon: FileSearch,
    color: 'bg-gray-500',
    href: '/tools/convert/pdf-to-txt'
  },
  {
    title: 'TXT to PDF',
    desc: 'Convert text files to PDF',
    icon: FileOutput,
    color: 'bg-green-500',
    href: '/tools/convert/txt-to-pdf'
  },
  {
    title: 'Merge PDF',
    desc: 'Combine PDFs with optional compress',
    icon: Archive,
    color: 'bg-orange-500',
    href: '/tools/merge'
  },
  {
    title: 'Split PDF',
    desc: 'Extract or split pages',
    icon: Scissors,
    color: 'bg-red-500',
    href: '/tools/split'
  },
  {
    title: 'Compress PDF',
    desc: 'Reduce file size',
    icon: FileType,
    color: 'bg-teal-500',
    href: '/tools/compress'
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All PDF Tools
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of free PDF tools. Simple, fast, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary-200 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${tool.color} bg-opacity-10 text-primary-600 mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">
                  {tool.title}
                </h3>
                <p className="text-gray-600">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
