import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/actions";
import { Typography, Container, Grid } from "@mui/material";
import Loading from "../components/Loading";
import Product from "../components/Product";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (products) {
    return (
      <div>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h2">Products</Typography>
          <Grid container spacing={4} justifyContent={"center"}>
            {products?.map((el) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Product
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  } else return <Loading />;
}
