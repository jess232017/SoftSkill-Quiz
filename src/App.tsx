import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import './style/index.css'

const Quiz = lazy(() => import('pages/Quiz'))
const Result = lazy(() => import('pages/Result'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='form' element={<Quiz />} />
          <Route path='form/result' element={<Result />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
