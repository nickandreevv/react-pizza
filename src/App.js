import Header from './components/Header'
import Home from './components/Pages/Home'
import NotFound from './components/NotFoundBlock/NotFound'
import Cart from './components/Pages/Cart'
import './scss/app.scss'
import { Route, Routes } from 'react-router'
import { useState } from 'react'
import { createContext } from 'react'

export const MainContext = createContext(' ')

function App() {
  const [value, setValue] = useState('')

  return (
    <div className="wrapper">
      <MainContext.Provider
        value={{
          value,
          setValue,
        }}
      >
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </div>
  )
}

export default App
