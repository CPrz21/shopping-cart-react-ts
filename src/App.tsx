import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
// import Item from './Item/Item';
// import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper } from './App.styles';
//Types
import { CartItem } from "../@types/CartItem";

const getProducts = async (): Promise<CartItem[]> =>
  await (await fetch(`${process.env.REACT_APP_API_URL}/products`)).json();

const App = () =>{

  const { data, isLoading, error } = useQuery<Array<CartItem>>('products', getProducts)

  if (isLoading) return <LinearProgress />;
  
  if (error) return <div>Something went wrong ...</div>;

  return (
    <div className="App">
      Config OK
    </div>
  );
}

export default App;
