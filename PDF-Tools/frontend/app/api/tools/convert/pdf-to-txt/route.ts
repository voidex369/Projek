import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const response = await fetch(`${API_URL}/api/tools/convert/pdf-to-txt`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText }, { status: response.status })
    }

    const blob = await response.blob()
    const headers = new Headers()
    headers.set('Content-Type', 'text/plain')
    headers.set('Content-Disposition', 'attachment; filename="extracted.txt"')

    return new NextResponse(blob, { headers })
  } catch (error) {
    console.error('PDF to TXT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}