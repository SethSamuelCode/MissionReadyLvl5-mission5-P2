import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/product' element = {<ProductPage/>}></Route>
     </Routes>
    </>
  )
}

export default App
