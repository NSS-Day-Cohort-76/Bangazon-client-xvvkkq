import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { StoreCard } from '../../components/store/card'
import { getStores } from '../../data/stores'
import { ProductCard } from '../../components/product/card'
import { getProducts } from '../../data/products'


export default function Stores() {
  const [stores, setStores] = useState([])
  const [product, setProduct] = useState([])

  useEffect(() => {
    getStores().then(data => {
      if (data) {
        setStores(data)
      }
    })
  }, [])

  return (
    <>
      <h1 className="title">Stores</h1>

      <div className="columns is-multiline">
        {stores.map(store => (
          <div key={store.id} className="column is-full">
            <StoreCard store={store} />

            <div className="columns is-multiline mt-4">
              {store.products.map(product => (
                <div className="column is-one-quarter" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

Stores.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
