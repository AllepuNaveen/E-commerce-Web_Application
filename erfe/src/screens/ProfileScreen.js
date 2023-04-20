import React, { useEffect, useState } from 'react'
import { Form, Button, Row,Col} from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/UserAction'
import Message from '../components/Message'
import Loader from '../components/Loader' 


function ProfileScreen() {

 

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading , user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    useEffect(()=> {
        if (!userInfo){
            navigate('/login')
        } else {
            if (!user || !user.name){
                dispatch(getUserDetails('profile'))
            }
        }
    },[dispatch,navigate, userInfo, user ])


  return (
    <Row className='justify-content-md-center'>
        <Col md={6} >
            <h3>User Profile</h3>
            Name : {userInfo.name}  <br />

            Username : {userInfo.email} <br />

            Email : {userInfo.email}



        </Col>
         
    </Row>
  )
}

export default ProfileScreen