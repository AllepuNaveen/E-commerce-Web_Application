// import './App.css';
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
  <Router>

      <Header/> 
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' Component={HomeScreen} exact />
            <Route path='/register' Component={RegisterScreen} /> 
            <Route path='/login' Component={LoginScreen} />
            <Route path='/profile' Component={ProfileScreen} />
            <Route path="/product/:id" Component={ProductScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />
            

            </Routes>
        </Container>
      </main>
      <Footer/>

      </Router>

   
 
  );
}

export default App;
