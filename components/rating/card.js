import dynamic from "next/dynamic";

// Import Rating component without SSR to avoid window errors
const Rating = dynamic(
  () => import("react-simple-star-rating").then((mod) => mod.Rating),
  {
    ssr: false,
    loading: () => <div>⭐</div>,
  }
);

export function RatingCard({ rating }) {
  return (
    <div className="tile is-child">
      <article className="media box is-align-items-center">
        <figure className="media-left">
          <Rating initialValue={rating.rating} readonly={true} />
        </figure>
        <div className="media-content">
          <div className="content">
            <p>{rating.review}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
