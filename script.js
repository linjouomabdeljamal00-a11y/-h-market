const products=[
{id:1,name:'Ampoule LED 12W',price:2500,icon:'💡',desc:'Éclairage LED économique et durable.'},
{id:2,name:'Multiprise 4 prises',price:7500,icon:'🔌',desc:'Multiprise pratique pour maison et bureau.'},
{id:3,name:'Lampe rechargeable',price:12000,icon:'🔦',desc:'Lampe portable rechargeable, idéale en cas de coupure.'},
{id:4,name:'Rallonge électrique',price:6000,icon:'⚡',desc:'Rallonge robuste pour vos équipements.'},
{id:5,name:'Prise murale',price:3500,icon:'🔲',desc:'Prise électrique pour installation intérieure.'},
{id:6,name:'Interrupteur',price:2500,icon:'◼️',desc:'Interrupteur moderne pour installation électrique.'},
{id:7,name:'Projecteur LED',price:18000,icon:'🔆',desc:'Éclairage puissant pour extérieur et intérieur.'},
{id:8,name:'Chargeur USB',price:5000,icon:'🔋',desc:'Chargeur compact pour appareils compatibles.'}
];
let cart=JSON.parse(localStorage.getItem('hmarket-cart')||'[]');
const money=n=>new Intl.NumberFormat('fr-FR').format(n)+' FCFA';
function renderProducts(list=products){document.querySelector('#products').innerHTML=list.map(p=>`<article class="product"><div class="pic">${p.icon}</div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="add" onclick="add(${p.id})">Ajouter au panier</button></div></article>`).join('')||'<p>Aucun produit trouvé.</p>'}
function add(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function remove(id){cart=cart.filter(i=>i.id!==id);save()}
function change(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<1)remove(id);else save()}
function save(){localStorage.setItem('hmarket-cart',JSON.stringify(cart));renderCart()}
function renderCart(){document.querySelector('#cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0);const box=document.querySelector('#cartItems');if(!cart.length){box.innerHTML='<p class="empty">Votre panier est vide.</p>';document.querySelector('#total').textContent='0 FCFA';return}let total=0;box.innerHTML=cart.map(i=>{const p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cart-item"><div><b>${p.name}</b><small>${money(p.price)} × ${i.qty}</small></div><div class="qty"><button onclick="change(${p.id},-1)">−</button> ${i.qty} <button onclick="change(${p.id},1)">+</button><button onclick="remove(${p.id})" style="margin-left:6px">×</button></div></div>`}).join('');document.querySelector('#total').textContent=money(total)}
function openCart(){document.querySelector('#cart').classList.add('open');document.querySelector('#overlay').classList.add('open')}
function closeCart(){document.querySelector('#cart').classList.remove('open');document.querySelector('#overlay').classList.remove('open')}
document.querySelector('#openCart').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;document.querySelector('#overlay').onclick=closeCart;
document.querySelector('#search').oninput=e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>(p.name+' '+p.desc).toLowerCase().includes(q)))};
document.querySelector('#order').onclick=()=>{if(!cart.length)return alert('Votre panier est vide.');let total=0;const lines=cart.map(i=>{const p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `• ${p.name} x${i.qty} = ${money(p.price*i.qty)}`});const msg=`Bonjour H Market, je souhaite commander :\n\n${lines.join('\n')}\n\nTotal : ${money(total)}\n\nMerci de me confirmer la disponibilité et les modalités de livraison.`;window.open('https://wa.me/237696195721?text='+encodeURIComponent(msg),'_blank')};
renderProducts();renderCart();
