import type { ComponentType } from 'react'
import { createInertiaApp } from '@inertiajs/react'

import { createRoot } from 'react-dom/client'
import '../css/app.css'
import './theme'

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob<{ default: ComponentType }>(
      './pages/**/*.tsx',
      { eager: true },
    )
    const page = pages[`./pages/${name}.tsx`]
    if (!page)
      throw new Error(`Page not found: ${name}`)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
