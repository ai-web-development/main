// 라우터 설정 모음

import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layouts/Layout'
import Home from '../pages/homePage/Home'
import EmotionStar from '../pages/emotionStarPage/EmotionStar'
import ReasonStar from '../pages/reasonStarPage/ReasonStar'
import ImaginationStar from '../pages/imaginationStarPage/ImaginationStar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,         element: <Home /> },
      { path: 'emotion',     element: <EmotionStar /> },
      { path: 'reason',      element: <ReasonStar /> },
      { path: 'imagination', element: <ImaginationStar /> },
    ],
  },
])

export default router
