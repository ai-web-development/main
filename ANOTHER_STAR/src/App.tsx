// 최상위 컴포넌트

import { RouterProvider } from 'react-router-dom'
import router from './routes/router'

function App() {
  return <RouterProvider router={router} />
}

export default App
