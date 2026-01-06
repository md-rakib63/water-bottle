const CartKey = "CartItems";


export const saveCartToStorage = (cart) => {
  localStorage.setItem(CartKey, JSON.stringify(cart));
};


export const getStoredCart = () => {
  const storedCart = localStorage.getItem(CartKey);
  return storedCart ? JSON.parse(storedCart) : [];
};
