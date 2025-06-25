import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ComparePage from './pages/ComparePage' 

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/item/:itemID' element = {<ProductPage/>}></Route>
      <Route path='/compare' element = {<ComparePage/>}></Route>  
     </Routes>
    </>
  )
}

export default App
