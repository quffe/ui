import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { component: string } }
) {
  try {
    const { component } = params
    
    if (!component) {
      return NextResponse.json({ error: 'Component name is required' }, { status: 400 })
    }

    const componentPath = path.join(process.cwd(), 'registry', `${component}.json`)
    
    if (!fs.existsSync(componentPath)) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }

    const componentData = JSON.parse(fs.readFileSync(componentPath, 'utf8'))
    
    return NextResponse.json(componentData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error('Component API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}