import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  cards: (cards) => ({
    display: "flex",
    flexWrap: "wrap",
    margin: "50px auto",
    justifyContent: "space-around",
  }),
  card: (card) => ({
    border: "1px solid rgb(211,211,211)",
    borderOpacity: 0.1,
    padding: 10,
    margin: 20,
    borderRadius: 5,
    width: card.width,
    maxWidth: card.maxWidth,
    display: "flex",
    flexDirection: "column",
    justifyContent: card.justifyContent,
    transition: "all .15s ease-in-out",
    "&:hover": {
      boxShadow: "1px 1px 5px gray",
    },
  }),
}));
