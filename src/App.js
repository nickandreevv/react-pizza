import Header from './components/Header'
import Home from './components/Pages/Home'
import NotFound from './components/NotFoundBlock/NotFound'
import Cart from './components/Pages/Cart'
import './scss/app.scss'
import { Route, Routes } from 'react-router'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <div className="wrapper">
      <Header value={value} setValue={setValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home value={value} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
