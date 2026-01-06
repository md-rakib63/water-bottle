import React, { useEffect, useState } from 'react';
import Bottle from './Bottle';

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/bottles.json')
      .then(res => res.json())
      .then(data => setBottles(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (bottle) => {
    setCart([...cart, bottle]);
  };

  
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex gap-4 p-4">
      {/* Bottles Grid */}
      <div className="grid grid-cols-4 gap-5 flex-3">
        {bottles.map(bottle => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
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
              <p key={item.id}>
                {item.name} - ${item.price}
              </p>
            ))}
            <hr className="my-2"/>
            <p className="font-bold">Total: ${totalPrice}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Bottles;
