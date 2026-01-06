import React, { useEffect, useState } from 'react';
import Bottle from './Bottle';
import { getStoredCart, saveCartToStorage } from './utlis/CartStorage';

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    const storedCart = getStoredCart();
    setCart (storedCart);
  },[])

  useEffect(() => {
    fetch('../../public/bottles.json')
      .then(res => res.json())
      .then(data => setBottles(data))
      .catch(err => console.error(err));
  }, []);

  // Add bottle to cart
  const handleAddToCart = (bottle) => {
    if (!cart.find(item => item.id === bottle.id)) {
      setCart([...cart, bottle]);
      saveCartToStorage([...cart, bottle])
    }
  };

  // Remove bottle from cart
  const handleRemoveFromCart = (id) => {
    const remainingCart = cart.filter(item => item.id !== id)
    setCart(remainingCart);
    saveCartToStorage(remainingCart)
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex gap-4 p-4">
      {/* Bottles Grid */}
      <div className="grid grid-cols-4 gap-5 flex-3">
        {bottles.map(bottle => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            cart={cart}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Cart */}
      <div className="w-1/4 border-2 border-red-500 p-3">
        <h2 className="font-bold mb-2 text-xl">Your Cart ({cart.length})</h2>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.length > 0 && (
          <>
            {cart.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-1"
              >
                <span>{item.name} - ${item.price}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 font-bold ml-2"
                >
                  x
                </button>
              </div>
            ))}
            <hr className="my-2"/>
            <p className="font-bold text-lg">Total: ${totalPrice}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Bottles;
