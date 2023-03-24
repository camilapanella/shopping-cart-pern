import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Saved from "./pages/Saved"
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetail} />
        <Route path="/cart" Component={Cart} />
        <Route path="/saved" Component={Saved} />
      </Routes>
    </>
  );
}

export default App;
