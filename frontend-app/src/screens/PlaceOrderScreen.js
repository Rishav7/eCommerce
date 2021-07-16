import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


import Message from '../components/Message'
import { Link } from 'react-router-dom'

import CheckoutSteps from '../components/Checkoutsteps.js'
import { createOrder } from '../actions/orderActions'


const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    // =========Calculating Prices =================


    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 10 : 100);

    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        console.log("place order");
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))

    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Shipping Address
                            </h2>
                            <p>
                                <strong>
                                    Address:
                                </strong>

                                {cart.shippingAddress.address}
                                <br />
                                {cart.shippingAddress.city},{" "}    <br />
                                {cart.shippingAddress.postalCode},{" "} <br />
                                {cart.shippingAddress.country}{" "} <br />
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>
                                Payment Method
                            </h2>
                            <p>Method: <strong>
                                {cart.paymentMethod}
                            </strong></p>

                        </ListGroup.Item>



                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Cart is issss empty</Message> : (
                                <ListGroup varient='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1} xs={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ₹ {item.qty * item.price}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <h2>Items</h2>
                                    <Col>₹ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <h2>Shipping Price</h2>
                                    <Col>₹ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <h2>Tax</h2>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <h2>Total</h2>
                                    <Col>₹ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    variant='primary'
                                    className='btn-block'
                                    disabled={cart.cartItem === 0}
                                    onClick={placeOrderHandler}

                                >
                                    Place Order</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
