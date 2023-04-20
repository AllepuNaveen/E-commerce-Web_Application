import React,{ useState,useEffect }  from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button, Card, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/ProductAction'
import Loader from '../components/Loader'
import Message from '../components/Message'



function ProductScreen() {

    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(()=> {
        dispatch(listProductDetails(id))

    },[dispatch, id])

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`)
    }


  return (

    <div>
        { 
        loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            :
             (
                <Row className='m-3'>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} style={{minWidth:'250px'}} fluid />
                    </Col>
                    <Col md={3}>

                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroupItem>

                            <ListGroupItem>
                                Price : Rs. {product.price}
                            </ListGroupItem>

                            <ListGroupItem>
                                Description: {product.description}
                            </ListGroupItem>

                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col> <strong> Rs. {product.price}</strong></Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={(e)=> setQty(e.target.value)}
                                                >
                                                    {
                                                        // Array(product.countInStock)  ------> will take the qty upto the no. of stock available
                                                        // values will be as [0,1,2,3,4]  ---> will limit the qty max upto 5
                                                        [...Array(5).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}

                            <ListGroupItem>
                                <Button
                                    onClick={addToCartHandler}
                                    className='btn-block' 
                                    disabled={product.countInStock==0} 
                                    type='button'>
                                    Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row> 
            )
        }
        <Link to="/" className='btn btn-primary my-3' >Go Home</Link>
    </div>
  )
}

export default ProductScreen