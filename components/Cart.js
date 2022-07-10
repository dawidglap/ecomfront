import { useStateContext } from "../lib/context"
import { Quantity } from "../styles/ProductDetails"
import { CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, Checkout } from "../styles/CartStyles"
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"
// import ProductDetails from "../pages/product/[slug]"

const Cart = () => {
    const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext()
    return (
        <CartWrapper onClick={() => setShowCart(false)}>
            <CartStyle onClick={(e) => e.stopPropagation()}>
                {cartItems.length < 1 && (

                    <EmptyStyle>
                        <h2>You have more shopping to do</h2>
                        <FaShoppingCart />
                    </EmptyStyle>
                )}
                {cartItems.length >= 1 && (
                    cartItems.map((item) => {
                        return (
                            <Card key={item.slug}>
                                <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />
                                <CardInfo>
                                    <h3>{item.title}</h3>
                                    <h3> {item.price} $</h3>
                                    <Quantity>
                                        <span>Quantity</span>
                                        <button>
                                            <AiFillMinusCircle onClick={() => onRemove(item)} />
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button>
                                            <AiFillPlusCircle onClick={() => onAdd(item, 1)} />
                                        </button>
                                    </Quantity>
                                </CardInfo>
                            </Card>
                        )
                    })
                )}
                {cartItems.length >= 1 && (
                    <Checkout>
                        <h3>Subtotal: {totalPrice} $</h3>
                        <button>Purchase</button>
                    </Checkout>
                )}
            </CartStyle>
        </CartWrapper>
    )
}

export default Cart