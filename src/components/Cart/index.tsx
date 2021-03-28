import CartItemComponent from '../CartItem';
// Styles
import { Wrapper } from './styles';
// Types
import { CartItem } from '../../../@types/CartItem';

type Props = {
  cartItems: CartItem[];
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart  }) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {
        cartItems.map((item: CartItem) => (
          <CartItemComponent
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))
      }
    </Wrapper>
  )
}

export default Cart
