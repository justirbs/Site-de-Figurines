/* Fonction qui vérifie si le formulaire est valide */
function verifierFormulaire() {
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  var adresse = document.getElementById("adresse").value;
  // on vérifie qu'aucun champ n'est vide
  if(nom != ""  &&  prenom != ""  &&  adresse != ""){
    // le formulaire est valide, on fait apparaître le bouton "valider"
    document.getElementById("boutonValider").setAttribute("style", "");
  }else{
    // au moins un champ est vide, on cache le bouton
    document.getElementById("boutonValider").setAttribute("style", "visibility: hidden;");
  }
}
