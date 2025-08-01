import { rateProduct } from "../../data/products";
import { RatingsContainer } from "./container";
import { Header } from "./header";

export function Ratings({
  average_rating,
  refresh,
  productId,
  ratings = [],
  number_purchased,
  likes = [],
}) {
  const saveRating = (newRating) => {
    if (productId) {
      console.log(
        "Submitting rating for product:",
        productId,
        "Rating:",
        newRating
      );
      rateProduct(productId, newRating).then(refresh);
    } else {
      console.error("No product ID available for rating");
    }
  };

  return (
    <div className="tile is-ancestor is-flex-wrap-wrap">
      <Header
        averageRating={average_rating}
        ratingsLen={ratings.length}
        numberPurchased={number_purchased}
        likesLength={likes.length}
      />
      <RatingsContainer ratings={ratings} saveRating={saveRating} />
    </div>
  );
}
