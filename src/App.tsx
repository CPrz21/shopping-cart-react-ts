import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './components/Item';
import Cart from './components/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';
//Types
import { CartItem } from "../@types/CartItem";

const getProducts = async (): Promise<CartItem[]> =>
  await (await fetch(`${process.env.REACT_APP_API_URL}/products`)).json();

const App = () =>{
  const [cartOpen, setcartOpen] = useState<boolean>(false);
  const [cartItems, setcartItems] = useState<CartItem[]>([]);
  const { data, isLoading, error } = useQuery<Array<CartItem>>('products', getProducts)

  const getTotalItems = (items: CartItem[]) =>
    items.reduce((ack: number, item: CartItem) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItem) => {
    setcartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      // First time the item is added
      return [ ...prev, {...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setcartItems(prev =>
      prev.reduce((ack, item) => {
        console.log("🚀 ~ file: App.tsx ~ line 48 ~ prev.reduce ~ ack, item", ack, item)
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItem[])
    );
  };

  if (isLoading) return <LinearProgress />;
  
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer 
        anchor="right" 
        open={cartOpen}
        onClose={() => setcartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setcartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color={'error'}>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid 
        container 
        spacing={3}
      >
        {
          // data && data.map((item: CartItem) => (
          data!.map((item: CartItem) => (
            <Grid 
              item 
              key={item.id}
              xs={12}
              sm={4}
            >
              <Item 
                item={item}
                handleAddToCart={handleAddToCart}
              />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
