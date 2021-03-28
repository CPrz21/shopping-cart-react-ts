import Button from '@material-ui/core/Button';
// Types
import { CartItem  } from '../../../@types/CartItem';
// Styles
import { Wrapper } from './styles';

type Props = {
  item: CartItem,
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const CartItemComponent: React.FC<Props> = ({ item, addToCart, removeFromCart}) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title}/>
    </Wrapper>
  )
}

export default CartItemComponent
