import React,{useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,Button, ListGroup, Image, Form, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/CartAction'


function CartScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    // const {productId} = useParams()


    const {id} = useParams()
    const productId = parseInt(id)
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // console.log('qty: ', qty)

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    // console.log('cartItems: ', cartItems)

    useEffect(() => {
        if (productId){
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch, productId,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }
  return (
    <Row>
        <Col md={8}>
            <h2>Shopping Cart</h2>
            {cartItems.length ===0 ? (
                <Message variant='info'>
                    Your cart is Empty  <Link to = '/' >Go Home</Link>
                    </Message> 
                    ) : (
                        <ListGroup  variant='flush'>
                            
                            {cartItems.map( item => (
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col md={4}>
                                            <Link to= {`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={3} className='text-center'>
                                        <Row>
                                            <Col>Qty: </Col>
                                            <Col>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e)=> dispatch(addToCart(item.product, Number( e.target.value)))}
                                            >
                                                {

                                                    // Array(item.countInStock)
                                                    [...Array(5).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                            </Col>
                                            </Row>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                        </Col>
                                    </Row>
                                    
                                </ListGroupItem>
                            ))}
                            
                        </ListGroup>
                    )
            }
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                    <h2>Subtotal: ({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) items</h2>
                    <h5>  Total Price: Rs. {cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)} </h5>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Button
                        type='button'
                        className='btn-block'
                        disabled = {cartItems.length ===0}
                        onClick={checkkOutHandler}
                        >
                            Proceed To CheckOut
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>

    </Row>
  )
}

export default CartScreen