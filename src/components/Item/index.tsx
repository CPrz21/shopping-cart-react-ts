import Button from "@material-ui/core/Button";
// Types
import  {CartItem} from "../../../@types/CartItem";
// Styles
import {Wrapper} from './styles';

type props = {
  item: CartItem,
  handleAddToCart: (clickedItem: CartItem) => void
}

const Item: React.FC<props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title}  />
      <div>
        <h3>{item.title}</h3>
        <h3>{item.description}</h3>
        <h3>${item.price}</h3>
      </div>
      <Button
        onClick={() => handleAddToCart(item)}
      >
        Add to cart
      </Button>
    </Wrapper>
  )
}

export default Item;