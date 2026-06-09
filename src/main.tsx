import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx' // 최상의 컴포넌트 App을 가져옴

// Root 생성 및 렌더링
createRoot(document.getElementById('root')!).render(  
  <StrictMode> {/*컴포넌트 X,잠재적 버그를 찾기 위한 React 제공 검사 도구 -> */}
    <App /> {/*최상위 컴포넌트*/}
  </StrictMode>,
)
