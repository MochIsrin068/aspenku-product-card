import './styles/main.scss'
import ProductContextProvider from './context/ProductContext'
import Routes from './routes'

const App = () => {
  return <ProductContextProvider>
    <Routes />
  </ProductContextProvider>
} 

export default App