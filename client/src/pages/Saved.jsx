import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSavedCarts,
  resetCart,
  loadCart,
  deleteCart,
} from "../actions/actions";
import { Grid, Button, CardMedia, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useStyles } from "../components/styles";
import { makeStyles } from "@mui/styles";

const useStylesLocal = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 15,
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 200,
  },
}));

export default function Saved() {
  const classesLocal = useStylesLocal();
  const dispatch = useDispatch();
  const savedCarts = useSelector((state) => state.savedCarts);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getSavedCarts());
  }, [dispatch]);

  const handleOpen = () => (open ? setOpen(false) : setOpen(true));
  const handleClose = () => setOpen(false);

  const handleLoadCart = (e) => {
    dispatch(resetCart());

    e?.map((cart) => {
      dispatch(loadCart(cart));
    });
    navigate("/cart");
  };

  const handleDelete = async (e) => {
    dispatch(await deleteCart(e.id));
    setOpen(false);
    dispatch(await getSavedCarts());
    toast.success(`${e.name} was deleted!`);
  };

  return (
    <Container fixed className={classes.cards}>
      <Grid container spacing={3}>
        {savedCarts.length ? (
          savedCarts.map((cart) => (
            <Card className={classes.card}>
              <Typography variant="h4">{cart.name}</Typography>
              <div>
                {cart.content?.flat().map((product) => (
                  <Card className={classes.card}>
                    <img
                      className={classesLocal.cover}
                      name={product.name}
                      src={product.image}
                      alt={product.name}
                    />
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="h5">x{product.quantity}</Typography>
                  </Card>
                ))}
              </div>
              <div>
                <Typography variant="h5">
                  Total: $
                  {cart.content
                    ?.flat()
                    .map((product) => {
                      let total = product.quantity * product.price;
                      return total;
                    })
                    .reduce((a, b) => a + b)}
                </Typography>
                {open ? (
                  <div>
                    <hr />
                    <Typography variant="h5">
                      You are about to delete this cart,
                      <br />
                      Are you sure?
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(cart)}
                    >
                      Yes
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                    >
                      no
                    </Button>
                  </div>
                ) : (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "30px 0" }}
                      onClick={() => handleLoadCart(cart.content.flat())}
                    >
                      Load this cart
                    </Button>
                    <div>
                      <Button
                        size="large"
                        variant="contained"
                        color="error"
                        onClick={handleOpen}
                      >
                        Delete saved carts
                      </Button>
                    </div>
                    <Toaster position="bottom-center" reverseOrder={false} />
                  </Grid>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div>
            <Typography variant="h2">
              You don't have any saved carts yet.
            </Typography>
          </div>
        )}
      </Grid>
    </Container>
  );
}
