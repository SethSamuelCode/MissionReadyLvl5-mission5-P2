import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductPage from './pages/ProductPage'
import ComparePage from './pages/ComparePage'

import Page404 from './pages/Page404'
import Watchlist from './pages/Watchlist'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/item/:ParamItemID" element={<ProductPage />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/compare" element={<ComparePage />}></Route>
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App
