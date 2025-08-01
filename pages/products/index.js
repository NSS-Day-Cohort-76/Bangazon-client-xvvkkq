import { useEffect, useState, useCallback } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getAllCategoriesWithRecentProducts, getCategories, getProducts } from "../../data/products";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([])
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [showFilters, setShowFilters] = useState(false);

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


  const searchProducts = useCallback((query) => {
    getProducts(query).then((productsData) => {
      if (productsData) {
        setProducts(productsData);
        const isFiltered = query && query.trim() !== ""
        setShowFilters(isFiltered)
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
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      {!showFilters && (
        <div className="columns is-multiline">

          {categories.map((category) => {
            const categoryProducts = productsByCategory[category.id] || [];

            return (
              
              <div className="column is-full" key={category.id}>
                <div className="box has-text-centered has-background-warning-light">
                  <h2 className="title is-4"><strong>{category.name}</strong></h2>
                </div>
                <h3 className="title is-5 ">Recently Listed</h3>

                <div className="columns is-multiline has-background-grey-lighter">
                  {categoryProducts.length > 0 ? (
                    categoryProducts.map((product) => (
                      <ProductCard product={product} key={product.id} width="is-one-fifth" />
                    ))
                  ) : (
                    <div className="block p-3 is-centered">
                      <h3 className=" title is-italic is-4 has-text-centered p-3">No products in category</h3>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}


      <div className="columns is-multiline">
        {showFilters && (
          <div className="column is-full">
  <div className="box has-text-centered is-full has-background-warning-light">
    <h2 className="title is-4">
      <strong>{showFilters ? "Filtered Products" : "All Products"}</strong>
    </h2>
  </div>
</div>)}


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
