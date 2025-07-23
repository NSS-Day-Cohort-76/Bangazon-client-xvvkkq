import { useEffect, useState } from "react";
import CardLayout from "../components/card-layout";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { ProductCard } from "../components/product/card";
import { StoreCard } from "../components/store/card";
import { useAppContext } from "../context/state";
import { getUserProfile } from "../data/auth";
import {
  getRecommendations,
  getRecommendationsByMe,
} from "../data/products.js";

export default function Profile() {
  const { profile, setProfile } = useAppContext();
  const [recommendationsToMe, setRecommendationsToMe] = useState([]); // Products recommended TO me
  const [recommendationsByMe, setRecommendationsByMe] = useState([]); // Products I've recommended

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData);
      }
    });
  }, []);

  useEffect(() => {
    // Get products recommended TO me
    getRecommendations().then(setRecommendationsToMe);

    // Get products I've recommended (we'll create this function)
    getRecommendationsByMe().then(setRecommendationsByMe);
  }, []);

  return (
    <>
      <CardLayout title="Favorite Stores" width="is-full">
        <div className="columns is-multiline">
          {profile.favorite_stores?.map((favorite) => (
            <StoreCard
              store={favorite}
              key={favorite.id}
              width="is-one-third"
            />
          ))}
        </div>
        <></>
      </CardLayout>
      <CardLayout title="Products you've recommended" width="is-full">
        <div className="columns is-multiline">
          {recommendationsByMe?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              width="is-one-third"
            />
          ))}
        </div>
        <></>
      </CardLayout>
      <CardLayout title="Products recommended to you" width="is-full">
        <div className="columns is-multiline">
          {recommendationsToMe?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              width="is-one-third"
            />
          ))}
        </div>
        <></>
      </CardLayout>

      <CardLayout title="Products you've liked" width="is-full">
        <div className="columns is-multiline">
          {profile.likes?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              width="is-one-third"
            />
          ))}
        </div>
        <></>
      </CardLayout>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
