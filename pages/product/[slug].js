import { useQuery } from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query"
import { useRouter } from 'next/router'
import { DetailStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails"
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useStateContext } from "../../lib/context"
import toast from "react-hot-toast"
import { useEffect } from "react"

export default function ProductDetails() {
    // USE STATE 
    const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

    // RESET QUANTITY 
    useEffect(() => {
        setQty(1)
    }, [])

    // FETCH SLUG 
    const { query } = useRouter()
    // FETCH GRAPHQL DATA 
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: { slug: query.slug }
    })
    const { data, fetching, error } = results
    // CHECK FOR DATA COMING IN 
    if (fetching) return <p>Loading...</p>
    if (error) return <p>porcaccio di..! {error.message}</p>
    //   EXTRACT OUR DATA 

    const { title, description, image, price } = data.products.data[0].attributes

    // create a toast 
    const notify = () => {
        toast.success(`${title} added to Cart'`, { duration: 750 })
    }

    return (
        <DetailStyle>

            <img src={image.data.attributes.formats.medium.url} alt={title} />

            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>

                <Quantity>
                    <span>quantity</span>
                    <button>
                        <AiFillMinusCircle onClick={decreaseQty} />
                    </button>
                    <p>{qty}</p>
                    <button>
                        <AiFillPlusCircle onClick={increaseQty} />
                    </button>
                </Quantity>
                <Buy onClick={() => {
                    onAdd(data.products.data[0].attributes, qty)
                    notify()
                }}>
                    add to cart
                </Buy>
            </ProductInfo>
        </DetailStyle >
    )
}