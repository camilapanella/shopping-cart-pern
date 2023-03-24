import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { getProductById, clearDetail, addToCart } from "../actions/actions";
import Loading from "./Loading";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Grid,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cover: {
    width: 300,
  },
});

export default function ProductDetail() {
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.products);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  function handleClick() {
    dispatch(addToCart(details[0].id));
    navigate("/cart");
  }

  if (details.length) {
    return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <Card sx={{ maxWidth: 500 }}>
              <Link to="/">
                <Button>Back</Button>
              </Link>
              <CardMedia
                component={"img"}
                sx={{}}
                className={classes.cover}
                image={details[0].image}
                title={details[0].name}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h2">{details[0].name}</Typography>
                {/* <img src={details[0].image} alt={details[0].name} /> */}
                <Typography variant="h5">
                  Description: {details[0].description}
                </Typography>
                <Typography variant="h6">Price: ${details[0].price}</Typography>
              </CardContent>
              <CardActions>
                  <IconButton onClick={handleClick}>
                    <AddShoppingCartIcon />
                  </IconButton>
                  <Typography variant="h6">
                  Add to cart
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return <Loading />;
  }
}