import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const response = await fetch(`${API_URL}/api/tools/convert/pdf-to-image`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText }, { status: response.status })
    }

    const blob = await response.blob()
    const headers = new Headers()
    headers.set('Content-Type', 'application/zip')
    headers.set('Content-Disposition', 'attachment; filename="pdf_images.zip"')

    return new NextResponse(blob, { headers })
  } catch (error) {
    console.error('PDF to Image error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}