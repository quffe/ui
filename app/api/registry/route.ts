import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const component = searchParams.get('component')

    if (!component) {
      // Return the registry index
      const registryPath = path.join(process.cwd(), 'registry', 'index.json')
      
      if (!fs.existsSync(registryPath)) {
        return NextResponse.json({ error: 'Registry not found' }, { status: 404 })
      }

      const registryData = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
      
      return NextResponse.json(registryData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        },
      })
    }

    // Return specific component
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
    console.error('Registry API Error:', error)
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