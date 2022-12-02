import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const list = data.products.map(eachProduct => ({
      title: eachProduct.title,
      id: eachProduct.id,
      imageUrl: eachProduct.image_url,
      brand: eachProduct.brand,
      price: eachProduct.price,
      rating: eachProduct.rating,
    }))
    console.log(data.products)
    this.setState({productsList: list, isLoading: false})
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        {isLoading ? (
          <div className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <>{this.renderProductsList()}</>
        )}
      </>
    )
  }
}

export default AllProductsSection
