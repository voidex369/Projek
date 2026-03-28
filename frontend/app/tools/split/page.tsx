'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Dropzone } from '@/components/ui/Dropzone'
import { Progress } from '@/components/ui/Progress'
import { ArrowLeft, FileText, Download, Scissors, FileOutput } from 'lucide-react'

export default function SplitPDFPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ urls: string[]; sizes: number[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [splitStrategy, setSplitStrategy] = useState<'all' | 'range'>('all')

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
      formData.append('strategy', splitStrategy)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 400)

      const response = await fetch('/api/tools/split', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error('Processing failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      // For simplicity, we assume split returns a ZIP file
      setResult({
        urls: [url],
        sizes: [blob.size]
      })
    } catch (err) {
      setError('Failed to process file. Please try again.')
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
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} MB`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
            <Scissors className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Split PDF
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract pages or split your PDF into separate files. Choose to split all pages or select a specific range.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                {!result ? (
                  <>
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
                          Split Options
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => setSplitStrategy('all')}
                                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                  splitStrategy === 'all'
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 text-gray-700 hover:border-primary-200'
                                }`}
                              >
                                Split All Pages
                              </button>
                              <button
                                type="button"
                                onClick={() => setSplitStrategy('range')}
                                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                  splitStrategy === 'range'
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 text-gray-700 hover:border-primary-200'
                                }`}
                              >
                                Select Range
                              </button>
                            </div>
                          </div>

                          {splitStrategy === 'range' && (
                            <div className="ml-0 p-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">
                                Range selection UI will be shown here (page numbers input).
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                      </div>
                    )}

                    <div className="mt-8 flex justify-center">
                      <Button
                        onClick={handleProcess}
                        disabled={isProcessing || !file}
                        size="lg"
                        className="min-w-[200px]"
                      >
                        {isProcessing ? (
                          <>
                            <FileOutput className="w-5 h-5 mr-2 animate-bounce" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Scissors className="w-5 h-5 mr-2" />
                            Split PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Your PDF is Ready!
                    </h3>

                    <p className="text-gray-600 mb-8">
                      Your split files have been packaged into a ZIP archive.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button href={result.urls[0]} download size="lg">
                        <Download className="w-5 h-5 mr-2" />
                        Download ZIP
                      </Button>
                      <Button variant="outline" onClick={handleReset} size="lg">
                        <FileText className="w-5 h-5 mr-2" />
                        Split Another
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {isProcessing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <p className="text-gray-700 font-medium">
                      Splitting your PDF...
                    </p>
                  </div>
                  <Progress value={progress} showLabel />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-4">How to use</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>Upload a PDF file</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Choose split mode (all pages or range)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Click &quot;Split PDF&quot;</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Download the split files</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Split all pages individually
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Extract specific page ranges
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Preserves original quality
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Fast processing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
