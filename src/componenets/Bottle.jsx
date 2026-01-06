import React from 'react';

const Bottle = ({ bottle, handleAddToCart, cart }) => {
  // Check if this bottle is already in cart
  const isInCart = cart.find(item => item.id === bottle.id);

  return (
    <div className="border-2 border-red-500 rounded p-3">
      <img className="w-32 h-32 mb-2" src={bottle.img} alt={bottle.name} />
      <p>Name: {bottle.name}</p>
      <p>Category: {bottle.category}</p>
      <p>Seller: {bottle.seller}</p>
      <p>Stock: {bottle.stock}</p>
      <button
        onClick={() => handleAddToCart(bottle)}
        disabled={isInCart} // disable if already in cart
        className={`${
          isInCart ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 rounded-full mt-2`}
      >
        {isInCart ? 'Purchased' : 'Buy Now'}
      </button>
    </div>
  );
};

export default Bottle;
