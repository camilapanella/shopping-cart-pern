import { React } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
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
});

export default function Product({ id, name, image, price }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia component="img" sx={{}} image={image} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h6">${price}</Typography>
        <Button variant="h4">
          <Link to={`/product/${id}`}>View</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
