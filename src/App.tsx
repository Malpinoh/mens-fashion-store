import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type Category = "All" | "Shirts" | "Trousers" | "Football Jerseys";
type ProductCategory = Exclude<Category, "All">;
type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  badge?: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
};
type CartItem = { product: Product; quantity: number; size: string; color: string };

const products: Product[] = [
  { id: 1, name: "Classic Oxford Shirt", category: "Shirts", price: 18500, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80", badge: "New", description: "A versatile button-down shirt for smart everyday dressing. Pair it with tailored trousers or denim.", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Blue"], stock: 12 },
  { id: 2, name: "Premium Black Shirt", category: "Shirts", price: 22000, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80", description: "A clean, easy-to-style shirt with a polished finish for evenings and occasions.", sizes: ["S", "M", "L", "XL"], colors: ["Black"], stock: 8 },
  { id: 3, name: "Straight Fit Trousers", category: "Trousers", price: 25000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80", description: "Straight-fit trousers designed to bring comfort and a sharp silhouette to your wardrobe.", sizes: ["30", "32", "34", "36", "38"], colors: ["Black", "Charcoal"], stock: 9 },
  { id: 4, name: "Smart Casual Trousers", category: "Trousers", price: 28000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80", description: "A smart-casual staple that works for office days, dinners and weekend plans.", sizes: ["30", "32", "34", "36"], colors: ["Beige", "Navy"], stock: 6 },
  { id: 5, name: "Nigeria Home Jersey", category: "Football Jerseys", price: 35000, image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80", badge: "Popular", description: "A football-inspired jersey for match days, casual looks and supporters.", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Green"], stock: 15 },
  { id: 6, name: "Classic Football Jersey", category: "Football Jerseys", price: 32000, image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80", description: "A classic football jersey silhouette made for everyday fan style.", sizes: ["S", "M", "L", "XL"], colors: ["Black", "White"], stock: 10 }
];
const money = (n: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export default function App() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menu, setMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });

  const visible = useMemo(() => products.filter(p => (category === "All" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const categories: Category[] = ["All", "Shirts", "Trousers", "Football Jerseys"];

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] ?? "");
    setSelectedColor(product.colors[0] ?? "");
  };
  const addToCart = (product: Product, size: string, color: string) => {
    if (!size || !color || product.stock < 1) return;
    setCart(current => {
      const existing = current.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) return current.map(item => item === existing ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item);
      return [...current, { product, quantity: 1, size, color }];
    });
    setSelectedProduct(null);
    setCheckoutMessage("");
  };
  const changeQuantity = (index: number, amount: number) => {
    setCart(current => current.map((item, i) => i === index ? { ...item, quantity: Math.max(1, Math.min(item.quantity + amount, item.product.stock)) } : item));
  };
  const removeItem = (index: number) => setCart(current => current.filter((_, i) => i !== index));
  const submitCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutMessage("Your checkout details are ready for the next integration step. Online payment is not enabled yet, so no order or payment has been submitted.");
  };

  return <div className="app">
    <div className="topbar">A considered collection of everyday menswear</div>
    <header className="header">
      <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
      <a className="brand" href="#">MF<span>.</span></a>
      <nav className={menu ? "nav open" : "nav"}>{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => { setCategory(c); setMenu(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>{c}</button>)}</nav>
      <div className="actions"><div className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." aria-label="Search products" /></div><button className="cart" onClick={() => document.getElementById("cart")?.scrollIntoView({ behavior: "smooth" })}>Bag <b>{itemCount}</b></button></div>
    </header>

    <main>
      <section className="hero"><div className="heroCopy"><p className="eyebrow">MEN'S COLLECTION</p><h1>Dress sharp.<br /><em>Move different.</em></h1><p>Clean shirts, smart trousers and football jerseys made for everyday confidence.</p><div className="heroButtons"><button className="primary" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>Shop collection</button><button className="secondary" onClick={() => { setCategory("Football Jerseys"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Football jerseys →</button></div></div><div className="heroVisual"><div className="heroCard"><span>NEW SEASON</span><strong>Built for<br />your style.</strong></div></div></section>

      <section className="categories"><button onClick={() => setCategory("Shirts")}><span>01</span><strong>Shirts</strong><small>Everyday essentials</small></button><button onClick={() => setCategory("Trousers")}><span>02</span><strong>Trousers</strong><small>Smart & comfortable</small></button><button onClick={() => setCategory("Football Jerseys")}><span>03</span><strong>Football</strong><small>Match-day energy</small></button></section>

      <section id="shop" className="shop"><div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2>Shop our latest pieces</h2></div><div className="filters">{categories.map(c => <button className={category === c ? "selected" : ""} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div></div>
        <div className="grid">{visible.map(p => <article className="product" key={p.id}><button className="productImageButton" onClick={() => openProduct(p)} aria-label={"View " + p.name}><div className="productImg">{p.badge && <span className="badge">{p.badge}</span>}<img src={p.image} alt={p.name} /><span className="quick">View details →</span></div></button><div className="productInfo"><span>{p.category}</span><h3>{p.name}</h3><strong>{money(p.price)}</strong><small className={p.stock <= 6 ? "stock low" : "stock"}>{p.stock > 0 ? p.stock + " available" : "Out of stock"}</small></div></article>)}</div>{visible.length === 0 && <div className="empty">No products found. Try another search.</div>}
      </section>

      <section className="story"><div><p className="eyebrow">WHY SHOP WITH US</p><h2>Simple pieces.<br />Strong presence.</h2></div><p>We focus on versatile men's fashion that works for weekends, work, outings and match days. Choose your preferred size and colour before adding an item to your bag.</p></section>

      <section id="cart" className="cartPanel"><div className="cartHeading"><p className="eyebrow">YOUR BAG</p><h2>Your selection</h2><p>{itemCount ? itemCount + " item" + (itemCount === 1 ? "" : "s") + " in your bag" : "Your bag is currently empty."}</p></div>
        {cart.length > 0 ? <div className="cartContent"><div className="cartItems">{cart.map((item, index) => <div className="cartItem" key={item.product.id + item.size + item.color}><img src={item.product.image} alt="" /><div className="cartItemInfo"><strong>{item.product.name}</strong><small>Size: {item.size} · Colour: {item.color}</small><b>{money(item.product.price * item.quantity)}</b><div className="quantity"><button onClick={() => changeQuantity(index, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(index, 1)} aria-label="Increase quantity">+</button></div></div><button className="remove" onClick={() => removeItem(index)}>Remove</button></div>)}</div><div className="cartSummary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Delivery fees, if applicable, will be confirmed before payment.</small><button className="primary" onClick={() => { setCheckoutOpen(true); setCheckoutMessage(""); }}>Continue to checkout →</button></div></div> : <button className="secondary" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>Browse products</button>}
      </section>

      {checkoutOpen && <section className="checkout" id="checkout"><div><p className="eyebrow">SECURE CHECKOUT</p><h2>Delivery details</h2><p>Enter your details. Payment will be connected after the store's gateway is configured.</p></div><form onSubmit={submitCheckout}><label>Full name<input required value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} placeholder="Your full name" /></label><label>Email address<input required type="email" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" /></label><label>Phone number<input required type="tel" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} placeholder="+234..." /></label><label>Delivery address<textarea required value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} placeholder="Street, area, city and state" rows={3} /></label><div className="checkoutTotal"><span>Order subtotal</span><strong>{money(subtotal)}</strong></div><button className="primary" type="submit">Review checkout details</button>{checkoutMessage && <p className="checkoutNotice" role="status">{checkoutMessage}</p>}</form></section>}
    </main>

    {selectedProduct && <div className="modalBackdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProduct(null); }}><section className="productModal" role="dialog" aria-modal="true" aria-label={selectedProduct.name}><button className="modalClose" onClick={() => setSelectedProduct(null)} aria-label="Close details">×</button><img className="modalImage" src={selectedProduct.image} alt={selectedProduct.name} /><div className="modalDetails"><p className="eyebrow">{selectedProduct.category}</p><h2>{selectedProduct.name}</h2><strong className="modalPrice">{money(selectedProduct.price)}</strong><p>{selectedProduct.description}</p><small className={selectedProduct.stock <= 6 ? "stock low" : "stock"}>{selectedProduct.stock} available</small><label>Choose size<select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>{selectedProduct.sizes.map(size => <option key={size} value={size}>{size}</option>)}</select></label><label>Choose colour<select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>{selectedProduct.colors.map(color => <option key={color} value={color}>{color}</option>)}</select></label><button className="primary addButton" disabled={selectedProduct.stock < 1} onClick={() => addToCart(selectedProduct, selectedSize, selectedColor)}>{selectedProduct.stock > 0 ? "Add to bag" : "Out of stock"}</button></div></section></div>}

    <footer><div><div className="brand">MF<span>.</span></div><p>Men's fashion, made simple.</p></div><small>© 2026 Men's Fashion Store. All rights reserved.</small></footer>
  </div>;
}
