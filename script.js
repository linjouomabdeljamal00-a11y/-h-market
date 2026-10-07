const P = [
["Parfum Femme Élégance","Produits de beauté",25000,"💄"],
["Parfum Homme Prestige","Produits de beauté",30000,"🧴"],
["Kit maquillage professionnel","Produits de beauté",18000,"💄"],
["Sérum visage","Produits de beauté",12000,"✨"],
["Crème hydratante","Produits de beauté",10000,"🧴"],
["Huile capillaire","Produits de beauté",8000,"💆"],
["Perruque Lace Front Naturelle","Perruques",85000,"💇"],
["Perruque Bob Luxe","Perruques",65000,"💇"],
["Perruque Longue Ondulée","Perruques",75000,"💇"],
["Perruque Bouclée Premium","Perruques",90000,"💇"],
["Perruque Courte Élégante","Perruques",45000,"💇"],
["Perruque Afro Naturelle","Perruques",55000,"💇"],
["iPhone 17 Pro Max","Téléphones",780000,"📱"],
["iPhone 17 Pro","Téléphones",720000,"📱"],
["iPhone 17 Air","Téléphones",585000,"📱"],
["iPhone 17","Téléphones",540000,"📱"],

["iPhone 16 Pro Max","Téléphones",543000,"📱"],
["iPhone 16 Pro","Téléphones",460000,"📱"],
["iPhone 16 Plus","Téléphones",430000,"📱"],
["iPhone 16","Téléphones",370000,"📱"],

["iPhone 15 Pro Max","Téléphones",420000,"📱"],
["iPhone 15 Pro","Téléphones",365000,"📱"],
["iPhone 15 Plus","Téléphones",320000,"📱"],
["iPhone 15","Téléphones",270000,"📱"],

["iPhone 14 Pro Max","Téléphones",320000,"📱"],
["iPhone 14 Pro","Téléphones",280000,"IMG_2035.jpeg"],
["iPhone 14 Plus","Téléphones",220000,"📱"],
["iPhone 14","Téléphones",190000,"📱"],

["iPhone 13 Pro Max","Téléphones",255000,"📱"],
["iPhone 13 Pro","Téléphones",220000,"📱"],
["iPhone 13 Mini","Téléphones",145000,"📱"],
["iPhone 13","Téléphones",159000,"IMG_2034.jpeg"],
["iPhone 12 Pro Max","Téléphones",185000,"📱"],
["iPhone 12 Pro","Téléphones",150000,"📱"],
["iPhone 12","Téléphones",115000,"📱"],
["iPhone 12 Mini","Téléphones",105000,"📱"],

["iPhone 11 Pro Max","Téléphones",135000,"📱"],
["iPhone 11 Pro","Téléphones",125000,"📱"],
["iPhone 11","Téléphones",90000,"📱"],

["iPhone XR","Téléphones",85000,"📱"],
["iPhone X","Téléphones",80000,"📱"],
["iPhone SE","Téléphones",65000,"📱"],
["iPhone 8","Téléphones",55000,"📱"],
["iPhone 7","Téléphones",35000,"📱"],

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

let cart = [];

const f = n =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";


function render(){

  let q = document
    .querySelector("#search")
    .value
    .toLowerCase();

  let c = document.querySelector("#filter").value;

  let a = P.filter(p =>
    (c === "Toutes" || p[1] === c) &&
    p[0].toLowerCase().includes(q)
  );

  document.querySelector("#grid").innerHTML =
    a.map(p => `

      <article class="card">

        <div class="pic">
  ${p[3].includes(".jpeg")
    ? `<img src="${p[3]}" alt="${p[0]}">`
    : p[3]}
</div>

        <div class="body">

          <span class="tag">${p[1]}</span>

          <h3>${p[0]}</h3>

          <p>
            Disponible chez H Market.
            Contactez-nous pour confirmer la disponibilité.
          </p>

          <div class="price">
            ${f(p[2])}
          </div>

          <button class="btn" onclick="details(${P.indexOf(p)})">
  👁️ Voir les détails
</button>

<button class="btn" onclick="add(${P.indexOf(p)})">
  🛒 Ajouter au panier
</button>

        </div>

      </article>

    `).join("") || "<p>Aucun produit trouvé.</p>";
}


function add(i){

  cart.push(i);

  update();

  document
    .querySelector("#drawer")
    .classList.add("open");
}


function update(){

  document.querySelector("#count").textContent =
    cart.length;

  document.querySelector("#items").innerHTML =

    cart.map((i,n) => `

      <div class="item">

        ${P[i][3]}
        <b>${P[i][0]}</b>

        <br>

        ${f(P[i][2])}

        <button
          onclick="cart.splice(${n},1);update()">
          ×
        </button>

      </div>

    `).join("") ||

    "<p>Panier vide.</p>";


  document.querySelector("#total").textContent =

    f(
      cart.reduce(
        (s,i) => s + P[i][2],
        0
      )
    );
}


document
  .querySelector("#search")
  .oninput = render;


document
  .querySelector("#filter")
  .onchange = render;


document
  .querySelectorAll(".cats button")
  .forEach(b => {

    b.onclick = () => {

      document
        .querySelector("#filter")
        .value = b.dataset.cat;

      document
        .querySelector("#products")
        .scrollIntoView();

      render();

    };

  });


document
  .querySelector("#cartBtn")
  .onclick = () => {

    document
      .querySelector("#drawer")
      .classList.add("open");

  };


document
  .querySelector("#close")
  .onclick = () => {

    document
      .querySelector("#drawer")
      .classList.remove("open");

  };


document
  .querySelector("#order")
  .onclick = () => {

    if(!cart.length){

      alert("Votre panier est vide.");

      return;

    }


    let t = cart
      .map(i =>
        "- " +
        P[i][0] +
        " : " +
        f(P[i][2])
      )
      .join("\n");


    let total = f(
      cart.reduce(
        (s,i) => s + P[i][2],
        0
      )
    );


    let message =
      "Bonjour H Market, je souhaite commander :" +
      "\n\n" +
      t +
      "\n\nTotal : " +
      total;


    window.open(
      "https://wa.me/237696195721?text=" +
      encodeURIComponent(message),
      "_blank"
    );

  };
function details(i){

  const p = P[i];

  document.querySelector("#modalContent").innerHTML = `

    <img
      src="${p[3]}"
      alt="${p[0]}"
      class="modal-image"
    >

    <span class="tag">${p[1]}</span>

    <h2>${p[0]}</h2>

    <div class="modal-price">
      ${f(p[2])}
    </div>

    <p>
      Découvrez ce produit chez H Market.
      Contactez-nous pour confirmer la disponibilité,
      les caractéristiques et les conditions de livraison.
    </p>

    <button
      class="btn"
      onclick="add(${i});closeDetails()">
      🛒 Ajouter au panier
    </button>

    <a
      class="btn white"
      target="_blank"
      href="https://wa.me/237696195721?text=${encodeURIComponent(
        "Bonjour H Market, je souhaite avoir plus de détails sur : " +
        p[0] +
        " au prix de " +
        f(p[2])
      )}">
      💬 Demander des informations
    </a>

  `;

  document
    .querySelector("#productModal")
    .classList.add("open");
}


function closeDetails(){

  document
    .querySelector("#productModal")
    .classList.remove("open");

}


document.querySelector("#modalClose").onclick =
  closeDetails;


document.querySelector("#productModal").onclick =
  function(e){

    if(e.target === this){
      closeDetails();
    }

  };

render();

update();
