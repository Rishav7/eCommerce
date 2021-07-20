import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')
	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}
	return (
		<Form onSubmit={submitHandler} className='d-flex p-2 '>
			<Form.Control
				type='search'
				placeholder='Search Product....'
				className='mr-2'
				aria-label='Search'
			></Form.Control>
			<Button
				type='submit'
				variant='outline-success'
				className='mr-sm-2 ml-sm-5 '
			>
				Search
			</Button>
		</Form>
	)
}

export default SearchBox
