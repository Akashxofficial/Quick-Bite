import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header flex items-center justify-center text-center min-h-[90vh] bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="header-contents max-w-2xl px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-6 animate-pulse">
          Taste the Best, <br /> Place Your Order!
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
     <button
  onClick={scrollToMenu}
  className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-pink-700 hover:shadow-pink-500/50"
>
  View Menu
        </button>
      </div>
      </div>
  );
};

export default Header;
