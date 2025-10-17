// Background.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa"; // coin icon
import "bootstrap/dist/css/bootstrap.min.css";

const themes = {
  yellow: "bg-yellow-400 text-gray-900",
  blue: "bg-blue-900 text-white",
  white: "bg-white text-gray-800",
};

const Background = () => {
  const [theme, setTheme] = useState("yellow");

  const coins = Array.from({ length: 10 });

  return (
    <div
      className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${themes[theme]}`}
    >
      {/* Floating Coins */}
      {coins.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <FaCoins className="text-yellow-300 drop-shadow-lg" />
        </motion.div>
      ))}

      {/* Center Content */}
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Durable Background 2.5</h1>
        <p className="mb-6">Floating coins with theme switcher</p>

        {/* Theme Switcher Buttons */}
        <div className="btn-group">
          <button
            className="btn btn-warning"
            onClick={() => setTheme("yellow")}
          >
            Yellow
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setTheme("blue")}
          >
            Dark Blue
          </button>
          <button
            className="btn btn-light"
            onClick={() => setTheme("white")}
          >
            Holo White
          </button>
        </div>
      </div>
    </div>
  );
};

export default Background;