import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './components/Item';
// import Cart from './Cart/Cart';
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
  console.log("🚀 ~ file: App.tsx ~ line 22 ~ App ~ data", data);

  const getTotalItems = (items: CartItem[]) => null;

  const handleAddToCart = (clickedItem: CartItem) => null;

  if (isLoading) return <LinearProgress />;
  
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer 
        anchor="right" 
        open={cartOpen}
        onClose={() => setcartOpen(false)}
      >
        goes here
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
