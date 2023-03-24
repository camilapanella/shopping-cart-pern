import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCart, resetCart } from "../actions/actions";
import { Button, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SavedCart({ cart }) {
  const currentCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    content: [cart],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(saveCart(input));
    dispatch(resetCart());
    toast.success(`${input.name} was successfully saved!`);
    setInput({
      name: "",
      content: [],
    });
    navigate("/saved")
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (!currentCart.length) {
      setError('Your cart is empty. Please go home and add some products');
      return;
    }
    setError('');
  }, [cart]);

  return (
    <Container fixed> 
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Typography variant="h3">Save your current cart</Typography>
              <TextField
                type="text"
                value={input.name}
                name="name"
                placeholder="Add name..."
                onChange={(e) => handleChange(e)}
              />
              {error && <p>{error}</p>}
              <Button disabled={!input.name} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  );
}