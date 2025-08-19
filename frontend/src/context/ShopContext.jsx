import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "./authContext";
import { userDataContext } from "./UserContex";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const currency = "₹ ";
  const delivery_fee = 40;

  // ✅ Get All Products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log("Product fetch error:", error.message);
    }
  };

  // ✅ Add to Cart
  const addtoCart = async (itemId, size) => {
    console.log("Add to cart called with:", itemId, size);

    if (!size) {
      toast.error("Please select size");
      return;
    }

    // clone cart data
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // update local state immediately
    setCartItem(cartData);
    console.log("Cart after update:", cartData);

    // also save on backend if logged in
    if (userData) {
      try {
        setLoading(true);
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log("Server response:", result.data);
        toast.success("Product Added");
      } catch (error) {
        console.log("Error in add cart:", error.response?.data || error.message);
        toast.error("Add Cart Error");
      } finally {
        setLoading(false);
      }
    }
  };


 // ✅ Update Quantity (increase / decrease)
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = JSON.parse(JSON.stringify(cartItem));

    if (!cartData[itemId]) cartData[itemId] = {};
    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.log("Update cart error:", error.message);
      }
    }
  };
      
    

  // ✅ Get Cart Items from backend
  const getUserCart = async () => {
    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/get",
          {},
          { withCredentials: true }
        );
        setCartItem(result.data);
        console.log("Fetched user cart:", result.data);
      } catch (error) {
        console.log("Cart fetch error:", error.message);
      }
    }
  };

  // ✅ Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const size in cartItem[items]) {
        totalCount += cartItem[items][size];
      }
    }
    return totalCount;
  };
 const getCartAmount = () => {
  let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalAmount
    
  }




  useEffect(() => {
    getProducts();
    getUserCart();
  }, [userData]);

    const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    addtoCart,
    cartItem,
    setCartItem, 
    getCartCount,
    getCartAmount,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    loading,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
