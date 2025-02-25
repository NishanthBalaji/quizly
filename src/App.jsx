import './App.css'
import Home from './components/Home'
import Quiz from './components/Quiz'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:category' element={<Quiz />} />
        </Routes>
      </Router>

    </div>

  )
}

export default App
