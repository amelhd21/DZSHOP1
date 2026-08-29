import Navbar from './navbar.jsx'
import './navbar.css'
import './App.css'
import Piedpage from './footer.jsx'
import './footer.css'
import ProductList from './produit.jsx'
import "./product.css"
import Dashboard from "./dactboard.jsx"
import "./Dashboard.css";
import { BrowserRouter , Route , Routes , Link } from 'react-router-dom'
import ProductDetailPage from './DetailProductPage.jsx'

function App() {
return (
<BrowserRouter>
 <Navbar/>
 <Routes>
 <Route path='/' element = {<Dashboard/>}/>
 <Route path='/products' element = {<ProductList/>}/>
 <Route path='/products/:id' element = {<ProductDetailPage/>}/>
 </Routes>
 <Piedpage/>
 </BrowserRouter>  
  )
}

export default App;
