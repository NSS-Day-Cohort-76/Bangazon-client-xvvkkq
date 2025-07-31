import Link from 'next/link'
import Image from 'next/image'

const BACKEND_URL = 'http://localhost:8000'

export function fixEncodedUrl(url) {
  if (url.startsWith(`${BACKEND_URL}/media/https%3A`)) {
    try {
      const encodedPart = url.replace(`${BACKEND_URL}/media/`, '')
      return decodeURIComponent(encodedPart)
    } catch {
      return url
    }
  }
  return url
}

export function ProductCard({ product, removeProduct, isOwner = false, width = "is-one-quarter" }) {
  let imgSrc = null

  if (product.image_path) {
    let rawUrl = fixEncodedUrl(product.image_path)
    imgSrc = rawUrl.startsWith('http')
      ? rawUrl
      : `${BACKEND_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
  } else if (product.image_url) {
    imgSrc = product.image_url
  }

  return (
    <div className={`column ${width}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-3by2">
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={product.name}
                width={640}
                height={480}
                unoptimized={imgSrc.startsWith('http')}
              />
            ) : (
              <div>No Image Available</div>
            )}
          </figure>
        </div>
        <header className="card-header">
          <p className="card-header-title">
            <Link href={`/products/${product.id}`}>{product.name} - ${product.price}</Link>
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            {product.description}
          </div>
        </div>
        {isOwner ? (
          <footer className="card-footer">
            <Link href={`/products/${product.id}/edit`} className="card-footer-item">Edit</Link>
            <a onClick={() => removeProduct(product.id)} className="card-footer-item">Delete</a>
          </footer>
        ) : null}
      </div>
    </div>
  )
}