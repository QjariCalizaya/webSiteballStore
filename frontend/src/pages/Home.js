import React from "react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import "./Home.css";


function Hero() {
  return (
    <div className="hero">
      <h1>Магазин товаров</h1>
      <button className="hero-btn">Shop Now</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h4>Контакты</h4>
        <p>1224 Улица, Город, Страна</p>
      </div>

      <div>
        <h4>Адрес</h4>
        <p>1234 Улица, Город, Страна</p>
      </div>

      <div>
        © 2024 Компания
      </div>
    </footer>
  );
}




function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductGrid />
      <Footer />
    </>
  );
}

export default Home;
