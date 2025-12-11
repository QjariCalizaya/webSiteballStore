export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1
    });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

export function updateQuantity(id, quantity) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}
