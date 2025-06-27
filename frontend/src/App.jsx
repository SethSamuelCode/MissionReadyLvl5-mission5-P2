import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductPage from './pages/ProductPage'
function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/marketplace' element={<Marketplace></Marketplace>}/>
      <Route path='/item/:itemID' element = {<ProductPage/>}></Route>
     </Routes>
    </>
  )
}

export default App
