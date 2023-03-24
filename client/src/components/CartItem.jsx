import { React } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  CardMedia,
  CardContent,
  Button,
  Card,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { removeFromCart, increment, decrement } from "../actions/actions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const useStyles = makeStyles((theme) => ({
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

export default function CartItem({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const totalItem = item.price * item.quantity;

  const removeItem = (e) => {
    dispatch(removeFromCart(e));
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={item.image}
        title={item.name}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </Typography>
        <Typography variant="h6">${item.price}</Typography>
        <Typography variant="h6">Sum: ${totalItem}</Typography>
        <Button onClick={() => dispatch(increment(item))}>
          <AddIcon />
        </Button>
        {item.quantity > 1 ? (
          <Button onClick={() => dispatch(decrement(item))}>
            <RemoveIcon />
          </Button>
        ) : (
          <Button disabled>
            <RemoveIcon />
          </Button>
        )}
        <Typography variant="h6">{item.quantity} item(s)</Typography>
        <Button onClick={() => removeItem(item)}>Delete item</Button>
      </CardContent>
    </Card>
  );
}