import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import Quiz from 'pages/Quiz'
import Result from 'pages/Result'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='form' element={<Quiz />} />
        <Route path='form/result' element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
