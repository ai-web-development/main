// 최상위 컴포넌트

import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { QuestionProvider } from './context/QuestionContext'

function App() {
  return (
    <QuestionProvider>
      <RouterProvider router={router} />
    </QuestionProvider>
  )
}

export default App
