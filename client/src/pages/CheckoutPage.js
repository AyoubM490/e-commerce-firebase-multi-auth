import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { addItem, removeItem, clearItem } from '../components/storeSlice';
import EmptyCart from '../components/EmptyCart';

function CheckoutPage() {
  const { cartItems, totalPrice } = useSelector((state) => state.store); 
  const dispatch = useDispatch();

  function handleAddItem(id) {
    dispatch(addItem({"id": id}))
  }

  function handleRemoveItem(id) {
    dispatch(removeItem({"id": id}))
  }

  function handleClearItem(id) {
    dispatch(clearItem({"id": id}))
  }

  return (
    cartItems.length === 0 ?
    <EmptyCart />
    : 
    <div>
      <h1 className='heading'>Checkout Cart</h1>
      <div className='checkout-section'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight: "bold"}}>Product</TableCell>
                <TableCell align="left" style={{fontWeight: "bold"}}>Name</TableCell>
                <TableCell align="left" style={{fontWeight: "bold"}}>Quantity</TableCell>
                <TableCell align="left" style={{fontWeight: "bold"}}>Price</TableCell>
                <TableCell align="left" style={{fontWeight: "bold"}}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                cartItems.map((item)=> (
                  <TableRow key={item.id}>
                    <TableCell><img className='cart-image' src={item.data.image} alt={item.data.title}/></TableCell>
                    <TableCell align="left">{item.data.title}</TableCell>
                    <TableCell align="left">
                      <div className='quantity'>
                        <div className='remove-cursor cursor' onClick={() => handleRemoveItem(item.id)}>&#10094;</div>
                         {item.quantity}
                        <div className='add-cursor cursor' onClick={() => handleAddItem(item.id)}>&#10095;</div>
                      </div>
                    </TableCell>
                    <TableCell align="left">${item.data.price}</TableCell>
                    <TableCell align="left"className="cursor" onClick={() => handleClearItem(item.id)}>&#10005;</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" className='price'>Total: ${totalPrice}</Typography>
        <br />
        <Link to="/payment">
          <Button variant="contained" className='proceed-button'>
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;