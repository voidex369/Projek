'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Dropzone } from '@/components/ui/Dropzone'
import { Progress } from '@/components/ui/Progress'
import { ArrowLeft, Image, Download, Upload, Settings } from 'lucide-react'

type ImageFormat = 'png' | 'jpeg'
type DpiOption = 100 | 150 | 200 | 300

export default function PdfToImagePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ url: string; size: number; pages: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Options
  const [imageFormat, setImageFormat] = useState<ImageFormat>('png')
  const [dpi, setDpi] = useState<DpiOption>(200)

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a PDF file')
      return
    }

    setIsProcessing(true)
    setError(null)
    setProgress(0)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('format', imageFormat)
      formData.append('dpi', dpi.toString())

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

      const response = await fetch('/api/tools/convert/pdf-to-image', {
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

      // We don't know page count from response headers; assume 1 for simplicity
      setResult({ url, size, pages: 1 })
    } catch (err) {
      setError('Failed to convert PDF to images. Please try again.')
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
            <Image className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF to Images
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract each page of a PDF as a separate image. Download as a ZIP archive.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {!result ? (
              <>
                {/* File Upload */}
                <Dropzone
                  onFilesSelected={(files) => setFile(files[0] || null)}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  multiple={false}
                  className="mb-6"
                />

                {/* Options */}
                {file && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Options
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image Format
                        </label>
                        <div className="flex space-x-3">
                          {(['png', 'jpeg'] as ImageFormat[]).map(fmt => (
                            <button
                              key={fmt}
                              type="button"
                              onClick={() => setImageFormat(fmt)}
                              className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                imageFormat === fmt
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 text-gray-700 hover:border-primary-200'
                              }`}
                            >
                              {fmt.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* DPI */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resolution (DPI)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {([100, 150, 200, 300] as DpiOption[]).map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setDpi(d)}
                              className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                                dpi === d
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 text-gray-700 hover:border-primary-200'
                              }`}
                            >
                              {d} DPI
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
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
                    disabled={isProcessing || !file}
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
                        <Image className="w-5 h-5 mr-2" />
                        Extract Images
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
                  Images Ready!
                </h3>

                <div className="my-8 p-6 bg-gray-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ZIP size</span>
                    <span className="font-medium">{formatSize(result.size)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Format</span>
                    <span className="font-medium">{imageFormat.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resolution</span>
                    <span className="font-medium">{dpi} DPI</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href={result.url} download size="lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download ZIP
                  </Button>
                  <Button variant="outline" onClick={handleReset} size="lg">
                    <Image className="w-5 h-5 mr-2" />
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
                  Converting PDF pages to images... This may take a moment.
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