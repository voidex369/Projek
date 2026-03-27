'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-bold text-white">PDF Tools</span>
            </div>
            <p className="text-sm max-w-xs">
              Free, secure, and easy-to-use PDF manipulation tools for everyone.
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
  )
}
