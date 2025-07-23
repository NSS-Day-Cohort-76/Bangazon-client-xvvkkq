import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { addProductToOrder, recommendProduct } from "../../data/products";
import Modal from "../modal";
import { Input } from "../form-elements";
import Image from "next/image";

const BACKEND_URL = 'http://localhost:8000';

function fixEncodedUrl(url) {
  if (url.startsWith(`${BACKEND_URL}/media/https%3A`)) {
    try {
      const encodedPart = url.replace(`${BACKEND_URL}/media/`, '');
      return decodeURIComponent(encodedPart);
    } catch {
      return url;
    }
  }
  return url;
}

export function Detail({ product, like, unlike }) {
  const router = useRouter();
  const usernameEl = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  let imgSrc = null;
  if (product.image_path) {
    const rawUrl = fixEncodedUrl(product.image_path);
    imgSrc = rawUrl.startsWith('http')
      ? rawUrl
      : `${BACKEND_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
  } else if (product.image_url) {
    imgSrc = product.image_url;
  }

  const addToCart = () => {
    addProductToOrder(product.id).then(() => {
      router.push("/cart");
    });
  };

  const recommendProductEvent = () => {
    recommendProduct(product.id, usernameEl.current.value).then((res) => {
      if (res) {
        setShowError(true);
      } else {
        setShowModal(false);
        setShowError(false);
        usernameEl.current.value = "";
      }
    });
  };

  return (
    <>
      <Modal setShowModal={setShowModal} showModal={showModal} title="Recommend this product to a user">
        <Input id="username" label="Enter a username" refEl={usernameEl}>
          {showError && <p className="help is-danger">This user doesn't exist</p>}
        </Input>
        <div className="buttons mt-2">
          <button className="button is-success" onClick={recommendProductEvent}>Recommend Product</button>
          <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            {imgSrc ? (
              <figure className="image is-3by2">
                <Image
                  src={imgSrc}
                  alt={product.name}
                  width={640}
                  height={480}
                  unoptimized={imgSrc.startsWith("http")}
                />
              </figure>
            ) : (
              <div>No Image Available</div>
            )}
          </article>
        </div>

        <div className="tile is-parent is-vertical">
          <article className="tile is-child">
            <h1 className="title">{product.name} - ${product.price}</h1>
            <p className="subtitle">{product.store?.name}</p>
            <p>{product.description}</p>
            <p>Pick up available in: {product.location}</p>
          </article>

          <article className="tile is-child is-align-self-center">
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary" onClick={addToCart}>Add to Cart</button>
              </p>
              <p className="control">
                <button className="button is-danger is-outlined" onClick={() => setShowModal(true)}>
                  Recommend this Product
                </button>
              </p>
              <p className="control">
                {product.is_liked ? (
                  <button className="button is-link is-outlined" onClick={unlike}>
                    <span className="icon is-small"><i className="fas fa-heart-broken" /></span>
                    <span>Unlike Product</span>
                  </button>
                ) : (
                  <button className="button is-link is-outlined" onClick={like}>
                    <span className="icon is-small"><i className="fas fa-heart" /></span>
                    <span>Like Product</span>
                  </button>
                )}
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}