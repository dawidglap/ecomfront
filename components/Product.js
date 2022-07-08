import { ProductStyle } from "../styles/ProductStyle"

const Products = ({ product }) => {
  //extract info from props
  const { title, price, image } = product.attributes
  return (
    <ProductStyle>
      <div>
        <img src={image.data.attributes.formats.small.url} alt="" />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyle>
  )
}

export default Products