// React App에서 페이지 이동을 관리

import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layouts/Layout'
import Home from '../pages/homePage/Home'
import StarExplain from '../pages/starexplainPage/StarExplain'
import EmotionStar from '../pages/emotionStarPage/EmotionStar'
import ReasonStar from '../pages/reasonStarPage/ReasonStar'
import ImaginationStar from '../pages/imaginationStarPage/ImaginationStar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,         element: <Home /> },
      { path: 'stars',       element: <StarExplain /> },
      { path: 'emotion',     element: <EmotionStar /> }, /* emotion이란 이름으로 매핑 */
      { path: 'reason',      element: <ReasonStar /> },
      { path: 'imagination', element: <ImaginationStar /> },
    ],
  },
])

export default router

/*
    path: '/',            // 사용자가 기본 주소로 들어오면
    element: <Layout />,  // 전체 틀(Layout)을 보여주고
    children: [           // 주소창 뒤에 붙은 말에 따라 알맞은 알맹이를 Latout 안에 끼움
*/
