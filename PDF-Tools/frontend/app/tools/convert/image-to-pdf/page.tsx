'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Dropzone } from '@/components/ui/Dropzone'
import { Progress } from '@/components/ui/Progress'
import { ArrowLeft, FileImage, Download, Upload } from 'lucide-react'

export default function ImageToPdfPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ url: string; size: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleProcess = async () => {
    if (files.length === 0) {
      setError('Please select at least one image')
      return
    }

    setIsProcessing(true)
    setError(null)
    setProgress(0)
    setResult(null)

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/tools/convert/image-to-pdf', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const size = blob.size

      setResult({ url, size })
    } catch (err) {
      setError('Failed to convert images to PDF. Please try again.')
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFiles([])
    setResult(null)
    setError(null)
    setProgress(0)
  }

  const formatSize = (bytes: number) => {
    const kb = Math.round(bytes / 1024)
    return `${kb} KB`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Back Navigation */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <FileImage className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Images to PDF
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combine one or more images (PNG, JPEG, WebP) into a single PDF document.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {!result ? (
              <>
                {/* File Upload */}
                <Dropzone
                  onFilesSelected={setFiles}
                  accept={{
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png'],
                    'image/webp': ['.webp']
                  }}
                  maxFiles={20}
                  multiple={true}
                  className="mb-6"
                />

                {/* Selected count */}
                {files.length > 0 && (
                  <div className="mb-4 text-sm text-gray-600">
                    {files.length} image{files.length > 1 ? 's' : ''} selected
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleProcess}
                    disabled={isProcessing || files.length === 0}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    {isProcessing ? (
                      <>
                        <Upload className="w-5 h-5 mr-2 animate-bounce" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <FileImage className="w-5 h-5 mr-2" />
                        Create PDF
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              /* Result View */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  PDF Created!
                </h3>

                <div className="my-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Output file size</div>
                  <div className="text-3xl font-bold text-gray-900">{formatSize(result.size)}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href={result.url} download size="lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={handleReset} size="lg">
                    <FileImage className="w-5 h-5 mr-2" />
                    Convert Another
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Bar */}
        {isProcessing && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <p className="text-gray-700 font-medium">
                  Creating PDF from images... This may take a moment.
                </p>
              </div>
              <Progress value={progress} showLabel />
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}