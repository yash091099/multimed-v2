import React, { useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import WhyChooseUs from "../components/WhyChooseUs";
import CartItems from "../components/Cart/CartItems";
import EmptyCart from "../components/Cart/EmptyCart";

const Cart = () => {
  const [needingProducts, setNeedingProducts] = useState(1);
  const [products, setProducts] = useState(1);


  return (
    <div>
      {needingProducts + products === 0 ? (
        <EmptyCart />
      ) : (
        <CartItems
          isPrescriptionApproved={false}
          products={products}
          needingProducts={needingProducts}
          setNeedingProducts={setNeedingProducts}
          setProducts={setProducts}
        />
      )}

      <ProductCarousel title="View Similar products" />
      <WhyChooseUs />
    </div>
  );
};

export default Cart;
