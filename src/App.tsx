import { useMemo, useState } from "react";

type Category = "All" | "Shirts" | "Trousers" | "Football Jerseys";
type Product = { id:number; name:string; category:Exclude<Category,"All">; price:number; image:string; badge?:string };

const products: Product[] = [
 {id:1,name:"Classic Oxford Shirt",category:"Shirts",price:18500,image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",badge:"New"},
 {id:2,name:"Premium Black Shirt",category:"Shirts",price:22000,image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80"},
 {id:3,name:"Straight Fit Trousers",category:"Trousers",price:25000,image:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80"},
 {id:4,name:"Smart Casual Trousers",category:"Trousers",price:28000,image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80"},
 {id:5,name:"Nigeria Home Jersey",category:"Football Jerseys",price:35000,image:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80",badge:"Popular"},
 {id:6,name:"Classic Football Jersey",category:"Football Jerseys",price:32000,image:"https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80"}
];
const money=(n:number)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);

export default function App(){
 const [category,setCategory]=useState<Category>("All"); const [query,setQuery]=useState(""); const [cart,setCart]=useState<Product[]>([]); const [menu,setMenu]=useState(false);
 const visible=useMemo(()=>products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())),[category,query]);
 const add=(p:Product)=>setCart(c=>[...c,p]);
 const whatsapp=()=>window.open("https://wa.me/?text="+encodeURIComponent("Hello, I want to order: "+cart.map(p=>p.name+" - "+money(p.price)).join(", ")),"_blank");
 const cats=["All","Shirts","Trousers","Football Jerseys"] as Category[];
 return <div className="app">
  <div className="topbar">Free delivery on selected orders • Shop confidently with us</div>
  <header className="header">
   <button className="menuBtn" onClick={()=>setMenu(!menu)}>☰</button><a className="brand" href="#">MF<span>.</span></a>
   <nav className={menu?"nav open":"nav"}>{cats.map(c=><button key={c} className={category===c?"active":""} onClick={()=>{setCategory(c);setMenu(false)}}>{c}</button>)}</nav>
   <div className="actions"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." /></div><button className="cart" onClick={()=>document.getElementById("cart")?.scrollIntoView({behavior:"smooth"})}>Cart <b>{cart.length}</b></button></div>
  </header>
  <main>
   <section className="hero"><div className="heroCopy"><p className="eyebrow">MEN'S COLLECTION</p><h1>Dress sharp.<br/><em>Move different.</em></h1><p>Clean shirts, smart trousers and football jerseys made for everyday confidence.</p><div className="heroButtons"><button className="primary" onClick={()=>document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}>Shop collection</button><button className="secondary" onClick={()=>setCategory("Football Jerseys")}>Football jerseys →</button></div></div><div className="heroVisual"><div className="heroCard"><span>NEW SEASON</span><strong>Built for<br/>your style.</strong></div></div></section>
   <section className="categories"><button onClick={()=>setCategory("Shirts")}><span>01</span><strong>Shirts</strong><small>Everyday essentials</small></button><button onClick={()=>setCategory("Trousers")}><span>02</span><strong>Trousers</strong><small>Smart & comfortable</small></button><button onClick={()=>setCategory("Football Jerseys")}><span>03</span><strong>Football</strong><small>Match-day energy</small></button></section>
   <section id="shop" className="shop"><div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2>Shop our latest pieces</h2></div><div className="filters">{cats.map(c=><button className={category===c?"selected":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></div>
    <div className="grid">{visible.map(p=><article className="product" key={p.id}><div className="productImg">{p.badge&&<span className="badge">{p.badge}</span>}<img src={p.image} alt={p.name}/><button className="quick" onClick={()=>add(p)}>+ Add to cart</button></div><div className="productInfo"><span>{p.category}</span><h3>{p.name}</h3><strong>{money(p.price)}</strong></div></article>)}</div>{visible.length===0&&<div className="empty">No products found. Try another search.</div>}</section>
   <section className="story"><div><p className="eyebrow">WHY SHOP WITH US</p><h2>Simple pieces.<br/>Strong presence.</h2></div><p>We focus on versatile men's fashion that works for weekends, work, outings and match days. More products, sizes and colours can be added as the store grows.</p></section>
   <section id="cart" className="cartPanel"><div><p className="eyebrow">YOUR BAG</p><h2>Ready to order?</h2><p>{cart.length?cart.length+" item"+(cart.length>1?"s":"")+" selected.":"Your cart is empty."}</p></div>{cart.length>0?<button className="primary" onClick={whatsapp}>Order on WhatsApp →</button>:<button className="secondary" onClick={()=>document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}>Browse products</button>}</section>
  </main>
  <footer><div><div className="brand">MF<span>.</span></div><p>Men's fashion, made simple.</p></div><small>© 2026 Men's Fashion Store. All rights reserved.</small></footer>
 </div>;
}