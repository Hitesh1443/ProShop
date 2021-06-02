import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Cart from "./screens/Cart";
import Login from "./screens/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to ProShop</h1>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
