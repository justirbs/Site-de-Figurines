var nbFig = 0; // nombre de figurine dans le panier
var valeurPanier = 0; // valeur du panier

/* Fonction pour ajouter un attribut onclick */
function ajouterOnClick(magasin, fonction) {
  // On modifie l'attrivu onclick de tous les éléments d'un même magasin
  var images = document.getElementById(magasin).children;
  for (var i = 0 ; i < images.length ; i++){
    images[i].setAttribute("onclick", fonction);
  }
}

/* Fonction pour ajouter un article dans les "choix" */
function ajouter(image) {
  var nvImage = image.cloneNode(true); // image clonée
  var idDest; // id du div où l'on veut déplacer l'image
  var idInit; // id du div d'où vient l'image
  nvImage.setAttribute("onclick", "retirer(this)");
  switch(nvImage.getAttribute("id")) {
    case "imageChap" :
      idDest = "choixChapeau";
      idInit = "magasinChapeau";
      break;
    case "imageHaut" :
      idDest = "choixHaut";
      idInit = "magasinVetementHaut";
      break;
    case "imageBas" :
      idDest = "choixBas";
      idInit = "magasinVetementBas";
      break;
    case "imageChaussure" :
      idDest = "choixChaussure";
      idInit = "magasinChaussure";
      break;
    default :
      console.log("Error id image");
      break;
  }
  document.getElementById(idDest).appendChild(nvImage);
  document.getElementById(idInit).removeChild(image);
  // on modifie l'attribu onclick des autres articles du magasin pour qu'on ne puisse pas en ajouter d'autres
  ajouterOnClick(idInit, "");
}

/* Fonction pour retirer un articles de "choix" */
function retirer(image) {
  var nvImage = image.cloneNode(true); // image clonée
  var idDest; // id du div où l'on veut déplacer l'image
  var idInit; // id du div d'où vient l'image
  nvImage.setAttribute("onclick", "ajouter(this)");
  switch(nvImage.getAttribute("id")) {
    case "imageChap" :
      idInit = "choixChapeau";
      idDest = "magasinChapeau";
      break;
    case "imageHaut" :
      idInit = "choixHaut";
      idDest = "magasinVetementHaut";
      break;
    case "imageBas" :
      idInit = "choixBas";
      idDest = "magasinVetementBas";
      break;
    case "imageChaussure" :
      idInit = "choixChaussure";
      idDest = "magasinChaussure";
      break;
    default :
      console.log("Error id image");
      break;
  }
  document.getElementById(idDest).appendChild(nvImage);
  document.getElementById(idInit).removeChild(image);
  // on modifie l'attribu onclick des autres articles du magasins pour pouvoir les ajouter à nouveau
  ajouterOnClick(idDest, "ajouter(this)");
}

/* Fonction pour ajouter une figurine au panier */
function ajouterFigurine() {
  var estValide = 0; // pour vérifier si une figurine est valide : n'est pas vide
  var prix = 25; // le prix de la figurine (il vaut initialement 25€)

  // Pour chaque catégorie (chapeau, ...) on vérifie si le contenu du div n'est pas nul, on indique alors si la figurine est valide, on augmente le prix et on remet les articles dans la boutique
  if(document.getElementById("choixChapeau").innerHTML != "") {
    estValide = 1;
    prix += 5;
    var articles = document.getElementById("choixChapeau").children;
    retirer(articles[0]);
  }

  if(document.getElementById("choixHaut").innerHTML != "") {
    estValide = 1;
    prix += 5;
    var articles = document.getElementById("choixHaut").children;
    retirer(articles[0]);
  }

  if(document.getElementById("choixBas").innerHTML != "") {
    estValide = 1;
    prix += 5;
    var articles = document.getElementById("choixBas").children;
    retirer(articles[0]);
  }

  if(document.getElementById("choixChaussure").innerHTML != "") {
    estValide = 1;
    prix += 5;
    var articles = document.getElementById("choixChaussure").children;
    retirer(articles[0]);
  }

  if(estValide == 1) {
    nbFig ++;
    valeurPanier += prix;
    // On ajouter la figurine dans le panier et on met la valeur du panier à jour
    document.getElementById("mesFigurines").innerHTML += "<p id='figurine' onclick='supprimerFigurine(this)'>Figurine "+ nbFig +" : " + prix + " €</p>";
    document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
  } else {
    // On ne peut pas ajouter une figurine vide au panier
    alert("Figure vide ! Vous ne pouvez pas l'ajouter au panier");
  }
}

/* Fonction pour supprimer une figurine du panier */
function supprimerFigurine(figurine) {
 if (prompt("Voulez vous supprimer la figurine ?\n(taper oui pour supprimer)") == "oui") {
   // on deduit le prix de la figurine dans la valeur du panier
   valeurPanier -= figurine.innerHTML.substring(figurine.innerHTML.length - 4, figurine.innerHTML.length - 2);
   document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
   // on supprime la figurine
   document.getElementById("mesFigurines").removeChild(figurine);
 }
}
