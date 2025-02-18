import { ReactQueryProvider } from '@/providers/react-query-provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes'
const router = createBrowserRouter(routes)

function App() {

  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  )
}

export default App
