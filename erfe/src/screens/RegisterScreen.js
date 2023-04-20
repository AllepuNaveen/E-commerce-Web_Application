import React, { useEffect, useState } from 'react'
import { Form, Button, Row,Col} from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/UserAction'
import Message from '../components/Message'
import Loader from '../components/Loader'


function RegisterScreen() {

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPasssword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password does not match')
            
        } else {
            dispatch(register(name, email, password))
        }
    }

  return (

    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger' > {message}</Message> }
        {error && <Message variant='danger'> {error} </Message>}
        {loading && <Loader/> }
        
        <Form onSubmit= {submitHandler}>
            <Form.Group controlId= 'name'>
                <Form.Label>Name: </Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='Enter Name'
                    required
                    value = {name}
                    onChange = {(e)=> setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
           
            <Form.Group controlId= 'email'>
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                    type='email'
                    placeholder='@gmail.com'
                    required
                    value = {email}
                    onChange = {(e)=> setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId= 'password'>
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Enter Password'
                    required
                    value = {password}
                    onChange = {(e)=> setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId= 'confirmPassword'>
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control 
                    type='password'
                    placeholder='Re-Enter Password'
                    required
                    value = {confirmPassword}
                    onChange = {(e)=> setConfirmPasssword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign Up
            </Button>

        </Form>

        <Row className="py-3">
                <Col>
                Already User?
                <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Sign In</Link>
                </Col>
            </Row>
    </FormContainer>
    
  )
}

export default RegisterScreen