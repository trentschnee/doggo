import { ReactQueryProvider } from '@/providers/react-query-provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Analytics } from "@vercel/analytics/react"

import { routes } from './routes'
const router = createBrowserRouter(routes)

function App() {

  return (<>
    <Analytics />

    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </>
  )
}

export default App
