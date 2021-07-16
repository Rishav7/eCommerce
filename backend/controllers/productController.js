import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// fettch all product --->access public ==>routes : /api/products

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	res.json(products)
	// console.log(products);
})
// fetch all product by id--->access public ==>routes : /api/products

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product Not Found')
	}
})

//desc    DeleteProductById
//routes DELETE  /api/products/:id
//access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'product deleted' })
	} else {
		res.status(404)
		throw new Error('Product Not Found')
	}
})

//desc Create product
//routes POST /api/products
//access private/admin

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

//desc update product
//routes POST /api/products
//access private/admin

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.description = description
		product.image = image
		product.brand = brand
		product.category = category
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
}