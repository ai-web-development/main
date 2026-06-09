// 최상위 컴포넌트

import { RouterProvider } from 'react-router-dom' // 라우터 기능을 제공하는 컴포넌트
import router from './routes/router'
import { QuestionProvider } from './context/QuestionContext' // 질문과 관련된 상태를 관리하는 Context Provider

// 감싸기 구조: 부모가 자식을 감싸면, 부모가 가진 능력(데이터나 기능)을 자식들이 물려받아 사용할 수 있음)
// QuestionProvider가 가장 바깥애서 전체 앱을 감싸고 있기 떄문에 그 안에 실행되는 모든 페이지 컴포너트들은 QuestionProvider가 제공하는 상태와 기능을 사용할 수 있음.
function App() {
  return (
    <QuestionProvider>
      <RouterProvider router={router} />
    </QuestionProvider>
  )
}

export default App

/* 
<RouterProvider router={router}/> : 전체 앱인 이유

1. router 변수 안에 "전체 앱의 설계도"가 담겨있음
2. 주소창의 URL이 바뀌면, RouterProvider는 router 변수 안에 담긴 설계도를 참고해서 어떤 페이지 컴포넌트를 보여줄지 결정함

대리인 (<RouterProvider>)
  ↓ (주소가 '/' 일 때)
<Layout>
  └─ <Home />  <-- Layout 내부의 <Outlet /> 자리에 탑재됨
  
  ↓ (주소가 '/emotion' 으로 바뀌면?)
<Layout>
  └─ <EmotionStar />  <-- 알맹이만 교체됨!
*/