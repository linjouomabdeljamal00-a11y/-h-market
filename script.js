const P=[
["Smartphone Android Pro","Téléphones",185000,"📱"],
["iPhone — modèle récent","Téléphones",450000,"📱"],
["PC Portable Core i5","Ordinateurs",275000,"💻"],
["PC Portable Core i7","Ordinateurs",395000,"💻"],
["Tablette Android","Tablettes",125000,"📲"],
["Réfrigérateur","Électroménager",325000,"🧊"],
["Four micro-ondes","Électroménager",95000,"🍲"],
["Ventilateur électrique","Appareils électriques",45000,"🌀"],
["Multiprise avec protection","Appareils électriques",15000,"🔌"],
["Power Bank","Accessoires",25000,"🔋"],
["Écouteurs Bluetooth","Accessoires",18000,"🎧"],
["Enceinte Bluetooth","Accessoires",35000,"🔊"],
["Console de jeu","Gaming & autres",250000,"🎮"],
["Montre connectée","Gaming & autres",45000,"⌚"]
];

let cart=[];

const f=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";

function render(){
  let q=document.querySelector("#search").value.toLowerCase(),
      c=document.querySelector("#filter").value;

  let a=P.filter(p=>
    (c=="Toutes"||p[1]==c)&&
    p[0].toLowerCase().includes(q)
  );

  document.querySelector("#grid").innerHTML=a.map(p=>`
    <article class="card">
      <div class="pic">${p[3]}</div>
      <div class="body">
        <span class="tag">${p[1]}</span>
        <h3>${p[0]}</h3>
        <p>Produit disponible sur H Market. Contactez-nous pour les détails.</p>
        <div class="price">${f(p[2])}</div>
        <button class="btn" onclick="add(${P.indexOf(p)})">
          Ajouter au panier
        </button>
      </div>
    </article>
  `).join("")||"<p>Aucun produit trouvé.</p>";
}

function add(i){
  cart.push(i);
  update();
  document.querySelector("#drawer").classList.add("open");
}

function update(){
  document.querySelector("#count").textContent=cart.length;

  document.querySelector("#items").innerHTML=cart.map((i,n)=>`
    <div class="item">
      ${P[i][3]} <b>${P[i][0]}</b><br>
      ${f(P[i][2])}
      <button onclick="cart.splice(${n},1);update()">×</button>
    </div>
  `).join("")||"<p>Panier vide.</p>";

  document.querySelector("#total").textContent=f(
    cart.reduce((s,i)=>s+P[i][2],0)
  );
}

document.querySelector("#search").oninput=render;

document.querySelector("#filter").onchange=render;

document.querySelectorAll(".cats button").forEach(b=>b.onclick=()=>{
  document.querySelector("#filter").value=b.dataset.cat;
  document.querySelector("#products").scrollIntoView();
  render();
});

document.querySelector("#cartBtn").onclick=()=>{
  document.querySelector("#drawer").classList.add("open");
};

document.querySelector("#close").onclick=()=>{
  document.querySelector("#drawer").classList.remove("open");
};

document.querySelector("#order").onclick=()=>{
  if(!cart.length){
    return alert("Votre panier est vide.");
  }

  let t=cart.map(i=>
    "- "+P[i][0]+" : "+f(P[i][2])
  ).join("\n");

  let total=f(
    cart.reduce((s,i)=>s+P[i][2],0)
  );

  open(
    "https://wa.me/237696195721?text="+
    encodeURIComponent(
      "Bonjour H Market, je souhaite commander :\n"+
      t+
      "\n\nTotal : "+total
    )
  );
};

render();
update();
