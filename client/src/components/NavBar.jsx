import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Typography, Container, Toolbar, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";

export default function NavBar() {
  const cart = useSelector((state) => state.cart);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <IconButton size="large" edge="start" aria-label="logo">
              <ShoppingBasketIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SHOPPING CART
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link to="/">
              <IconButton>
                <HomeIcon />
              </IconButton>
              <Typography variant="button">Home</Typography>
            </Link>
            <Link to="/cart">
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            <Link to="/saved">
              <IconButton>
                <GradeIcon />
              </IconButton>
              <Typography variant="button">Saved carts</Typography>
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}