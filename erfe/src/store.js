import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer } from './reducers/UserReducers'


const reducers= combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    cart : {cartItems : cartItemsFromStorage},
    userLogin : { userInfo : userInfoFromStorage }
}

const middleware = [thunk]

const store= createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)) )

export default store