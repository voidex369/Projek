'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Dropzone } from '@/components/ui/Dropzone'
import { Progress } from '@/components/ui/Progress'
import { ArrowLeft, FileText, Download, Upload, Zap, FileDown } from 'lucide-react'

type CompressionLevel = 'none' | 'low' | 'medium' | 'high'

export default function MergePDFPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ url: string; size: number; originalSize: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Options
  const [mergeWithCompress, setMergeWithCompress] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium')

  const handleProcess = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge')
      return
    }

    setIsProcessing(true)
    setError(null)
    setProgress(0)
    setResult(null)

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('compress', mergeWithCompress ? 'true' : 'false')
      if (mergeWithCompress) {
        formData.append('compression_level', compressionLevel)
      }

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

      const response = await fetch('/api/tools/merge', {
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
      const size = blob.size

      setResult({
        url,
        size,
        originalSize: files.reduce((acc, f) => acc + f.size, 0)
      })
    } catch (err) {
      setError('Failed to process files. Please try again.')
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
    setMergeWithCompress(false)
    setCompressionLevel('medium')
  }

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} MB`
  }

  // Calculate compression ratio estimate
  const getEstimate = () => {
    if (files.length === 0) return null
    const total = files.reduce((acc, f) => acc + f.size, 0)
    if (!mergeWithCompress) {
      return {
        original: total,
        estimated: total,
        reduction: 0
      }
    }
    // Estimates based on compression level
    const reductionMap: Record<CompressionLevel, number> = {
      'low': 0.15,      // ~15% reduction
      'medium': 0.35,   // ~35% reduction
      'high': 0.60      // ~60% reduction
    }
    const reduction = reductionMap[compressionLevel]
    return {
      original: total,
      estimated: total * (1 - reduction),
      reduction: reduction * 100
    }
  }

  const estimate = getEstimate()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
            <FileDown className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Merge PDF
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combine multiple PDF files into one document. Optional: compress the merged result to reduce file size.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                {!result ? (
                  <>
                    {/* File Upload */}
                    <Dropzone
                      onFilesSelected={setFiles}
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={20}
                      multiple={true}
                      className="mb-6"
                    />

                    {/* Options */}
                    {files.length >= 2 && (
                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Options
                        </h3>

                        <div className="space-y-4">
                          {/* Merge + Compress Toggle */}
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="merge-compress"
                              checked={mergeWithCompress}
                              onChange={(e) => setMergeWithCompress(e.target.checked)}
                              className="mt-1 w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <div className="flex-1">
                              <label htmlFor="merge-compress" className="flex items-center text-gray-900 font-medium cursor-pointer">
                                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                                Merge + Compress
                              </label>
                              <p className="text-sm text-gray-500 mt-1">
                                After merging, compress the final PDF to reduce file size
                              </p>
                            </div>
                          </div>

                          {/* Compression Level (only if merge+compress is checked) */}
                          {mergeWithCompress && (
                            <div className="ml-7 p-4 bg-gray-50 rounded-lg">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Compression Level
                              </label>
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  { value: 'low', label: 'Low', desc: 'Minimal compression, best quality' },
                                  { value: 'medium', label: 'Medium', desc: 'Balanced size & quality' },
                                  { value: 'high', label: 'High', desc: 'Maximum compression' }
                                ].map(level => (
                                  <button
                                    key={level.value}
                                    type="button"
                                    onClick={() => setCompressionLevel(level.value as CompressionLevel)}
                                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                                      compressionLevel === level.value
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 hover:border-primary-200'
                                    }`}
                                  >
                                    <div className="font-medium text-gray-900 text-sm">
                                      {level.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {level.desc}
                                    </div>
                                  </button>
                                ))}
                              </div>

                              {/* Estimation */}
                              {estimate && (
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <div className="flex items-center text-blue-800 text-sm font-medium mb-2">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Estimated Result
                                  </div>
                                  <div className="space-y-1 text-sm text-blue-900">
                                    <div className="flex justify-between">
                                      <span>Original total:</span>
                                      <span className="font-mono">{formatSize(estimate.original)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>After compression:</span>
                                      <span className="font-mono">{formatSize(estimate.estimated)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                      <span>Space saved:</span>
                                      <span className="text-green-700">{estimate.reduction.toFixed(1)}%</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
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
                        disabled={isProcessing || files.length < 2}
                        size="lg"
                        className="min-w-[200px]"
                      >
                        {isProcessing ? (
                          <>
                            <Upload className="w-5 h-5 mr-2 animate-bounce" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileDown className="w-5 h-5 mr-2" />
                            Merge PDFs
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
                      Your PDF is Ready!
                    </h3>

                    <div className="my-8 p-6 bg-gray-50 rounded-xl space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Original Total Size</span>
                        <span className="font-medium">{formatSize(result.originalSize)}</span>
                      </div>

                      {mergeWithCompress && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Compressed Size</span>
                            <span className="font-medium">{formatSize(result.size)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Saved</span>
                            <span className="font-medium text-green-600">
                              {compressionRatio}%
                            </span>
                          </div>
                        </>
                      )}

                      {!mergeWithCompress && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Merged Size</span>
                          <span className="font-medium">{formatSize(result.size)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button href={result.url} download size="lg">
                        <Download className="w-5 h-5 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleReset} size="lg">
                        <FileText className="w-5 h-5 mr-2" />
                        Merge Another
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
                      Processing your files... This may take a moment.
                    </p>
                  </div>
                  <Progress value={progress} showLabel />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-4">How to use</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>Upload at least 2 PDF files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Optional: enable &quot;Merge + Compress&quot; to reduce final size</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Click &quot;Merge PDFs&quot; and wait</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Download your merged file</span>
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
                    Unlimited merges
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    100% free
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Auto-delete after 24h
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Secure (256-bit TLS)
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
