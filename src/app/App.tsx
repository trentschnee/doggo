import { ReactQueryProvider } from '@/app/providers/react-query-provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
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
