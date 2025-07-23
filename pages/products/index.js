import { useEffect, useState, useCallback } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getAllCategoriesWithRecentProducts, getCategories, getProducts } from "../../data/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([])
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
          const locationData = [
            ...new Set(data.map((product) => product.location)),
          ];
          const locationObjects = locationData.map((location) => ({
            id: location,
            name: location,
          }));

          setProducts(data);
          setIsLoading(false);
          setLocations(locationObjects);
        }
      })
      .catch((err) => {
        setLoadingMessage(
          `Unable to retrieve products. Status code ${err.message} on response.`
        );
      });
  }, []);

  useEffect(() => {
    getCategories().then((data) => {
      if (data) {
        setCategories(data);
      }
    });
  }, []);

  useEffect(() => {
    getAllCategoriesWithRecentProducts()
      .then((data) => {
        if (data) {
          setCategoriesWithProducts(data);
          const grouped = {};
          data.forEach(category => {
            grouped[category.id] = category.products || [];
          });
          setProductsByCategory(grouped);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadingMessage(
          `Unable to retrieve recent products. Status code ${err.message} on response.`
        );
        setIsLoading(false);
      });
  }, []);


  const searchProducts = useCallback((event) => {
    getProducts(event).then((productsData) => {
      if (productsData) {
        setProducts(productsData);
      }
    });
  }, []);

  if (isLoading) return <p>{loadingMessage}</p>;

  return (
    <>
      <Filter
        productCount={products.length}
        onSearch={searchProducts}
        locations={locations}
      />
      if(showFilters){
        
      }
      <div className="columns is-multiline">
        {categories.map((category) => {
          const categoryProducts = productsByCategory[category.id] || [];

          return (
            <div className="column is-full" key={category.id}>
              <div className="box has-text-centered">
                <strong>{category.name}</strong>
              </div>
              <p className="has-text-centered">Latest Products</p>

              <div className="columns is-multiline">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <ProductCard product={product} key={product.id} width="is-one-fifth" />
                  ))
                ) : (
                  <p className="has-text-centered is-italic">No products in category</p>
                )}
              </div>
            </div>
          );
        })}
      </div>


      <div className="columns is-multiline">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
