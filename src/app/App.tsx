import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { extendTheme, ChakraProvider, Container } from '@chakra-ui/react'
import Home from './components/Home/Home'
import ProductPage from './components/ProductPage/ProductPage'
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import PageNotFound from './components/PageNotFound/PageNotFound'
import { CartProvider } from './contexts/Cart'
import Checkout from './components/Checkout/Checkout'

const colors = {
  brand: {
    800: '#f7cbcf',
    700: '#f6d2d5',
  },
  black: '#2c2629',
}

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
}

const theme = extendTheme({ colors, fonts })

function App(): JSX.Element {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <NavBar />
          <Container maxW="1200px">
            {/* <img src={logo} className={styles['App-logo']} alt="logo" /> */}
            <Switch>
              <Route path="/prodotti/:productSlug">
                <ProductPage />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/*">
                <PageNotFound />
              </Route>
            </Switch>
          </Container>
          <Footer />
        </CartProvider>
      </ChakraProvider>
    </Router>
  )
}

export default App
