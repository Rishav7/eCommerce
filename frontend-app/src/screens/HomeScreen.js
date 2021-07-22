import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

//import products from "../products";
import Product from '../components/Product'
//importing useDispatch for lading the data in the homeScreen
import { useDispatch, useSelector } from 'react-redux'
//importing action for lading the data in the homeScreen
import { listProducts } from '../actions/productActions'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from './Meta'
import { Link } from 'react-router-dom'

const HomeScreen = ({ match }) => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)

	//we are destructuring from  the productList and pull out
	const { loading, error, products, page, pages } = productList

	//searching products for
	const keyword = match.params.keyword

	//page
	const pageNumber = match.params.pageNumber || 1

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta></Meta>
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					←
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products &&
							products.map((product) => (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Product product={product} />
								</Col>
							))}
					</Row>
					<div class='d-flex'>
						<div class='mx-auto'>
							<Paginate
								className='text-center'
								pages={pages}
								page={page}
								keyword={keyword ? keyword : ''}
							/>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default HomeScreen
