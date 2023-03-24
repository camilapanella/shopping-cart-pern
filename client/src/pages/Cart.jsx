import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { resetCart, getProducts, getSavedCarts } from "../actions/actions";
import { Typography, Container, Grid, Button } from "@mui/material";
import SavedCarts from "../components/SavedCarts";
import { Toaster } from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSavedCarts());
  }, []);

  const handleReset = () => {
    dispatch(resetCart());
  };

  return (
    <Container fixed>
      <Button variant="h3">
        <Link to="/">Go back</Link>
      </Button>
      <Typography variant="h2">Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h3">Your cart is currently empty</Typography>
      ) : (
        <Container fixed>
          <Grid container spacing={3}>
            {cart?.map((e) => (
              <Grid item xs={12} sm={6} md={4}>
                <CartItem key={e.id} item={e} />
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4">Subtotal ${total}</Typography>
          <Button
            color="primary"
            variant="outlined"
            sx={{ margin: "5px 5px" }}
            onClick={(e) => handleReset(e)}
          >
            Empty cart
          </Button>
          {!showForm ? (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setShowForm(true)}
              sx={{ margin: "5px 5px" }}
            >
              Save current cart
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setShowForm(false)}
              sx={{ margin: "5px 5px" }}
            >
              Hide form
            </Button>
          )}
          {showForm && (
            <div>
              <SavedCarts cart={cart} />
            </div>
          )}
          <br />
          <Button
            sx={{ margin: "15px 0" }}
            color="primary"
            variant="contained"
            component={Link}
            to="/saved"
          >
            My carts
          </Button>
          <Toaster position="bottom-center" reverseOrder={false} />
        </Container>
      )}
    </Container>
  );
}
