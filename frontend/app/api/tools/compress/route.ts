import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const response = await fetch(`${API_URL}/api/tools/compress`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to compress PDF' }, { status: response.status })
    }

    const blob = await response.blob()
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', 'attachment; filename="compressed.pdf"')

    return new NextResponse(blob, { headers })
  } catch (error) {
    console.error('Compress API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
