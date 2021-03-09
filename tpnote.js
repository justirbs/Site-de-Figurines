function ajouterOnClick(magasin, fonction) {
  var images = document.getElementById(magasin).children;
  for (var i = 0 ; i < images.length ; i++){
    images[i].setAttribute("onclick", fonction);
  }
}

function ajouter(image) {
  var nvImage = image.cloneNode(true);
  var idDest;
  var idInit;
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
  ajouterOnClick(idInit, "");
}

function retirer(image) {
  var nvImage = image.cloneNode(true);
  var idDest;
  var idInit;
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
  ajouterOnClick(idDest, "ajouter(this)");
}
