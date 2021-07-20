import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox.js'
import { Route } from 'react-router-dom'

const Headers = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const dispatch = useDispatch()

	const logoutHandler = () => {
		console.log('logout')
		dispatch(logout())
	}

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<LinkContainer to='/'>
					<Navbar.Brand>InstaShop</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Route render={({ history }) => <SearchBox history={history} />} />
				<Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
					<Nav className='ml-auto'>
						<LinkContainer to='/cart'>
							<Nav.Link>
								<i className='fas fa-shopping-cart'></i> Cart
							</Nav.Link>
						</LinkContainer>

						{userInfo ? (
							<NavDropdown title={userInfo.name} id='username'>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>
									LogOut
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-users'></i>Sign In
								</Nav.Link>
							</LinkContainer>
						)}

						{userInfo && userInfo.isAdmin && (
							<NavDropdown title='Admin' id='adminMenu'>
								<LinkContainer to='/admin/userlist'>
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to='/admin/productlist'>
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to='/admin/orderlist'>
									<NavDropdown.Item>orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}

export default Headers
