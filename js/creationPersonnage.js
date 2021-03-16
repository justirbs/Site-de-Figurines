var figurines = []; // tableau qui contient toutes les figurines
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
  nvImage.setAttribute("onclick", "retirer(this)");
  // id du div où l'on veut déplacer l'image
  var idDest = "choix" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length);
  // id du div d'où vient l'image
  var idInit = "magasin" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length);
  document.getElementById(idDest).appendChild(nvImage);
  document.getElementById(idInit).removeChild(image);
  // on modifie l'attribu onclick des autres articles du magasin pour qu'on ne puisse pas en ajouter d'autres
  ajouterOnClick(idInit, "");
}



/* Fonction pour retirer un articles de "choix" */
function retirer(image) {
  var nvImage = image.cloneNode(true); // image clonée
  nvImage.setAttribute("onclick", "ajouter(this)");
  // id du div où l'on veut déplacer l'image
  var idDest = "magasin" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length);
  // id du div d'où vient l'image
  var idInit = "choix" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length);
  document.getElementById(idDest).appendChild(nvImage);
  document.getElementById(idInit).removeChild(image);
  // on modifie l'attribu onclick des autres articles du magasins pour pouvoir les ajouter à nouveau
  ajouterOnClick(idDest, "ajouter(this)");
}



/* Fonction pour ajouter une figurine au panier */
function ajouterFigurine() {
  estValide = 0; // variable qui indique si la figurine est vide ou non
  var prix = 25; // le prix de la figurine (il vaut initialement 25€)
  // on vide toutes les catégories
  if(rangerArticle("Chapeau") == 1) {
    estValide = 1;
    prix += 5;
  }
  if(rangerArticle("Haut") == 1) {
    estValide = 1;
    prix += 5;
  }
  if(rangerArticle("Bas") == 1) {
    estValide = 1;
    prix += 5;
  }
  if(rangerArticle("Chaussure") == 1) {
    estValide = 1;
    prix += 5;
  }
  if(rangerArticle("Pokeball") == 1) {
    estValide = 1;
    prix += 5;
  }
  if(estValide == 1) {
    var indice = figurines.push(prix);
    valeurPanier += prix;
    // On ajouter la figurine dans le panier et on met la valeur du panier à jour
    document.getElementById("mesFigurines").innerHTML += "<p id='figurine" + indice + "' onclick='supprimerFigurine(this)'>Figurine "+ indice +" : " + prix + " €</p>";
    document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
  } else {
    // On ne peut pas ajouter une figurine vide au panier
    alert("Figure vide ! Vous ne pouvez pas l'ajouter au panier");
  }
}



/*Pour chaque catégorie (chapeau, ...) on vérifie si le contenu du div n'est pas nul, on indique alors si la figurine est valide, on augmente le prix et on remet les articles dans la boutique */
function rangerArticle(categorie) {
  var estPresent = 0; // variable qui indique si un vétement est bien présent dans la catégorie
  if(document.getElementById("choix" + categorie).innerHTML != ""){
    estPresent = 1;
    var articles = document.getElementById("choix" + categorie).children;
    retirer(articles[0]);
  }
  return(estPresent);
}



/* Fonction pour supprimer une figurine du panier */
function supprimerFigurine(figurine) {
 if (confirm("Voulez vous supprimer cette figurine ?")) {
   alert("Vous avez supprimé la figurine");
   // on deduit le prix de la figurine dans la valeur du panier
   valeurPanier -= figurine.getAttribute("id").substring(8, figurine.getAttribute("id").length);
   document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
   // on supprime la figurine
   document.getElementById("mesFigurines").removeChild(figurine);
 } else {
   alert("Vous n'avez pas supprimé la figurine");
 }
}



/* Fonction qui vérifie si on peut valider le panier */
function validerPanier() {
  // on vérifie que le panier n'est pas vide
  if(valeurPanier != 0){
    // on change de page html pour remplir les informations sur la livraison
    document.location.href="infomationLivraison.html";
  } else {
    alert("Vous ne pouvez pas valider un panier vide !");
  }
}
