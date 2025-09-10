import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const component = searchParams.get('component')

    if (!component) {
      // Return the registry index with namespace information
      const registryPath = path.join(process.cwd(), 'registry', 'index.json')
      
      if (!fs.existsSync(registryPath)) {
        return NextResponse.json({ error: 'Registry not found' }, { status: 404 })
      }

      const registryData = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
      
      // Format registry response according to shadcn schema
      const namespacedRegistry = {
        name: '@ui-components',
        type: 'registry:index',
        description: 'A comprehensive UI components library with TypeScript, Tailwind CSS v4, and shadcn/ui patterns',
        homepage: 'http://localhost:3000',
        author: 'UI Components Library',
        items: registryData,
        namespace: '@ui-components',
        namespaces: {
          '@ui-components': 'Main UI components registry',
          '@ui-components/ui': 'Base UI primitives (Button, Card, Input, etc.)',
          '@ui-components/form': 'Form-specific components (InputAmount, OtpInput, etc.)',
          '@ui-components/input': 'Advanced input components (DateRangePicker, InputSelect)',
          '@ui-components/data': 'Data visualization components (DataTable)',
          '@ui-components/navigation': 'Navigation components (Dropdown, SelectDropdown)',
          '@ui-components/modal': 'Modal and overlay components',
          '@ui-components/hooks': 'Custom React hooks'
        }
      }
      
      return NextResponse.json(namespacedRegistry, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        },
      })
    }

    // Handle both namespaced (form/checkbox) and direct (checkbox) component requests
    let componentPath
    let componentName = component
    
    // If it's a namespaced request (e.g., form/checkbox), extract just the component name
    if (component.includes('/')) {
      componentName = component.split('/')[1]
    }
    
    componentPath = path.join(process.cwd(), 'registry', `${componentName}.json`)
    
    if (!fs.existsSync(componentPath)) {
      return NextResponse.json({ error: `Component '${component}' not found` }, { status: 404 })
    }

    const componentData = JSON.parse(fs.readFileSync(componentPath, 'utf8'))
    
    // Update the component data to reflect the requested namespace format
    if (component.includes('/')) {
      componentData.name = component // e.g., "form/checkbox"
    }
    
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