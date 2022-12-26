import { AccountBar, Header } from "./components";
import { Outlet, Routes, Route } from "react-router-dom";
import { Cart, CheckOut, Home, Login, Product, SignUp } from "./pages";
import { CartContext, Product as TypeProduct } from "./contexts/cartContext";
import { useState } from "react";

function App() {
  const [items, setItems] = useState<Array<TypeProduct>>([]);

  const value = {
    items,
    addItem: (item: TypeProduct) => {
      const itemIndex = items.findIndex((_item) => _item.id === item.id);

      if (itemIndex !== -1) {
        setItems((prev) => {
          prev[itemIndex].quantity++;
          return prev;
        });
        return;
      }
      setItems((prev) => {
        return [...prev, item];
      });
    },
    removeItem: ({ id }: TypeProduct) => {
      const itemIndex = items.findIndex((_item) => _item.id === id);

      if (itemIndex !== -1 && items[itemIndex].quantity !== 1) {
        setItems((prev) => {
          prev[itemIndex].quantity--;
          return prev;
        });
        return;
      }

      setItems((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    },
  };

  return (
    <CartContext.Provider value={value}>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
              <AccountBar />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/check-out" element={<CheckOut />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
