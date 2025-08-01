import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import Rating component without SSR to avoid window errors
const Rating = dynamic(
  () => import("react-simple-star-rating").then((mod) => mod.Rating),
  {
    ssr: false,
    loading: () => <div>Loading stars...</div>,
  }
);

export default function RatingForm({ saveRating }) {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");

  const submitRating = () => {
    // react-simple-star-rating directly returns the star rating (1-5)
    // No conversion needed - rating is already the correct value
    const ratingValue = rating;

    if (ratingValue === 0) {
      alert("Please select a rating before submitting");
      return;
    }

    console.log("Raw rating value from component:", rating);
    console.log("Final rating value being sent:", ratingValue);

    saveRating({
      rating: ratingValue,
      review: comment.trim() || null,
    });

    // Reset form after submission
    setRating(0);
    setComment("");
  };

  return (
    <div className="tile is-child ">
      <article className="media box">
        <figure className="media-left">
          <Rating
            onClick={setRating}
            ratingValue={rating}
            size={30}
            allowHalfStar={true}
            transition={true}
          />
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button" onClick={submitRating}>
                Post Rating
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
