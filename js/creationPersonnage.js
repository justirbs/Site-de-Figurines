var prixFigurines = []; // tableau qui contient tous les prix des figurines
var sauvFigurines = []; // tableau qui contient toutes les figurines créées
var valeurPanier = 0; // valeur du panier

var prixChapeau = [5, 5, 5, 10, 7, 7]; // tableau qui contient les prix des chapeaux
var prixHaut = [7, 7, 7, 10, 6, 6]; // tableau qui contient les prix des hauts
var prixBas = [10, 10, 5, 5, 7, 7]; // tableau qui contient les prix des bas
var prixChaussure = [10, 5, 5, 5, 5, 10]; // tableau qui contient les prix des chaussures
var prixPokeball = [5, 5, 5]; // tableau qui contient les prix des pokeball

/* Fonction pour ajouter un attribut onclick */
function ajouterOnClick(magasin, fonction) {
  // On modifie l'attribut onclick de tous les éléments d'un même magasin
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
  var idDest = "choix" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length - 1);
  // id du div d'où vient l'image
  var idInit = "magasin" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length - 1);
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
  var idDest = "magasin" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length - 1);
  // id du div d'où vient l'image
  var idInit = "choix" + nvImage.getAttribute("id").substring(5, nvImage.getAttribute("id").length - 1);
  document.getElementById(idDest).appendChild(nvImage);
  document.getElementById(idInit).removeChild(image);
  // on modifie l'attribu onclick des autres articles du magasins pour pouvoir les ajouter à nouveau
  ajouterOnClick(idDest, "ajouter(this)");
}



/* Fonction pour ajouter une figurine au panier */
function ajouterFigurine() {
  // on range tous les articles
  var chapeau = rangerArticle("Chapeau");
  var haut = rangerArticle("Haut");
  var bas = rangerArticle("Bas");
  var chaussure = rangerArticle("Chaussure");
  var pokeball = rangerArticle("Pokeball");
  var figurine = [chapeau, haut, bas, chaussure, pokeball];
  // on calcule le prix
  var prix = calculPrix(figurine);
  if(prix != 0) {
    // le prix vaut initialement 25€
    prix += 25;
    // on stocke les infos de notre figurine
    var nbFigurine = sauvFigurines.push(figurine);
    var indice = prixFigurines.push(prix);
    valeurPanier += prix;
    // On ajouter la figurine dans le panier et on met la valeur du panier à jour
    document.getElementById("mesFigurines").innerHTML += "<p id='figurine" + indice + "' onclick='modifierFigurine(this)'>Figurine "+ indice +" : " + prix + " €</p>";
    document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
  } else {
    // On ne peut pas ajouter une figurine vide au panier
    alert("Figure vide ! Vous ne pouvez pas l'ajouter au panier");
  }
}



/* Fonction qui calcul le prix de la figurine*/
function calculPrix(figurine) {
  var prix = 0; // si la figurine est vide, le prix vaut 0
  for(i=0; i<figurine.length; i++){
    if(figurine[i] != 0) {
      switch (i) {
        case 0: prix += prixChapeau[figurine[i] - 1];
          break;
        case 1: prix += prixHaut[figurine[i] - 1];
          break;
        case 2: prix += prixBas[figurine[i] - 1];
          break;
        case 3: prix += prixChaussure[figurine[i] - 1];
          break;
        case 4: prix += prixPokeball[figurine[i] - 1];
          break;
        default: break;
      }
    }
  }
  return(prix);
}



/*Pour chaque catégorie (chapeau, ...) on vérifie si le contenu du div n'est pas nul, on indique alors si la figurine est valide, on augmente le prix et on remet les articles dans la boutique */
function rangerArticle(categorie) {
  var numArticle = 0; // variable qui indique le numéro de l'article (1, 2, ..), si il n'y a pas d'article, il vaut 0
  if(document.getElementById("choix" + categorie).innerHTML != ""){
    var articles = document.getElementById("choix" + categorie).children;
    numArticle = articles[0].getAttribute("alt").substring(articles[0].getAttribute("alt").length - 1, articles[0].getAttribute("alt").length);
    retirer(articles[0]);
  }
  return(numArticle);
}



/* Fonction pour supprimer une figurine du panier */
function supprimerFigurine(figurine, nb) {
  if (nb == 0) {
    // dans ce cas on modifie la figurine, selon l'envie de l'utilisateur
    if (confirm("Voulez vous supprimer cette figurine ?")) {
      alert("Vous avez supprimé la figurine");
      // on deduit le prix de la figurine dans la valeur du panier
      valeurPanier -= prixFigurines[figurine.getAttribute("id").substring(8, figurine.getAttribute("id").length) - 1];
      document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
      // on supprime la figurine
      document.getElementById("mesFigurines").removeChild(figurine);
    } else {
      alert("Vous n'avez pas supprimé la figurine");
    }
  } else {
    // dans ce cas, on modifie automatiquement la figurine
    valeurPanier -= prixFigurines[figurine.getAttribute("id").substring(8, figurine.getAttribute("id").length) - 1];
    document.getElementById("valeurPanier").innerHTML = "Valeur du Panier : " + valeurPanier + " €";
    document.getElementById("mesFigurines").removeChild(figurine);
  }
}


/* Fonction pour modifier une figurine du panier */
function modifierFigurine(figurine) {
  if (confirm("Voulez vous modifier cette figurine ?")) {
    // on doit d'abord retirer tous ce qu'il y a dans l'espace "choix"
    viderChoix();
    // on récupère la bonne sauvegarde
    var figurineModif = sauvFigurines[figurine.getAttribute("id").substring(8, figurine.getAttribute("id").length) - 1];
    // il faut ensuite replacer les articles de la figurine dans l'espace "choix"
    if(figurineModif[0] != 0) {
      ajouter(document.getElementById("imageChapeau" + figurineModif[0]));
    }
    if(figurineModif[1] != 0) {
      ajouter(document.getElementById("imageHaut" + figurineModif[1]));
    }
    if(figurineModif[2] != 0) {
      ajouter(document.getElementById("imageBas" + figurineModif[2]));
    }
    if(figurineModif[3] != 0) {
      ajouter(document.getElementById("imageChaussure" + figurineModif[3]));
    }
    if(figurineModif[4] != 0) {
      ajouter(document.getElementById("imagePokeball" + figurineModif[4]));
    }
    // on supprime l'ancienne figurine
    supprimerFigurine(figurine, 1);
  } else {
    supprimerFigurine(figurine, 0);
  }
}



/* Fonction pour vider l'espace "choix" */
function viderChoix() {
  // on vide chaque catégorie
  var chapeau = rangerArticle("Chapeau");
  var haut = rangerArticle("Haut");
  var bas = rangerArticle("Bas");
  var chaussure = rangerArticle("Chaussure");
  var pokeball = rangerArticle("Pokeball");
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


/* Fonction qui affiche le prix d'un article quand on passe la souris dessus */
function afficherPrix(image) {
  // on cherche le type de l'article (chapeau, haut, ...)
  var article = image.getAttribute("id").substring(5, image.getAttribute("id").length - 1);
  // oncherche le numéro de l'article
  var indice = image.getAttribute("id").substring(image.getAttribute("id").length - 1, image.getAttribute("id").length) - 1;
  switch (article) {
    case "Chapeau":
      document.getElementById("prixChapeau").innerHTML = "Prix : " + prixChapeau[indice] + " €";
      break;
    case "Haut":
      document.getElementById("prixHaut").innerHTML = "Prix : " + prixHaut[indice] + " €";
      break;
    case "Bas":
      document.getElementById("prixBas").innerHTML = "Prix : " + prixBas[indice] + " €";
      break;
    case "Chaussure":
      document.getElementById("prixChaussure").innerHTML = "Prix : " + prixChaussure[indice] + " €";
      break;
    case "Pokeball":
      document.getElementById("prixPokeball").innerHTML = "Prix : " + prixPokeball[indice] + " €";
      break;
    default: break;
  }
}



/* Fonction qui retire le prix d'un article quand on enlêve la souris */
function retirerPrix(image) {
  // on cherche le type de l'article (chapeau, haut, ...)
  var article = image.getAttribute("id").substring(5, image.getAttribute("id").length - 1);
  switch (article) {
    case "Chapeau":
      document.getElementById("prixChapeau").innerHTML = "Prix : €";
      break;
    case "Haut":
      document.getElementById("prixHaut").innerHTML = "Prix : €";
      break;
    case "Bas":
      document.getElementById("prixBas").innerHTML = "Prix : €";
      break;
    case "Chaussure":
      document.getElementById("prixChaussure").innerHTML = "Prix : €";
      break;
    case "Pokeball":
      document.getElementById("prixPokeball").innerHTML = "Prix : €";
      break;
    default: break;
  }
}
