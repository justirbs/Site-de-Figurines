/*Pour récupérer les informations du formulaire */

// On enlève le ?
var param = window.location.search.slice(1,window.location.search.length);
// On sépare le paramètres en tableau,
// une nouvelle case est créée pour chaque "&" rencontré
// first[0] est de la forme attr=valeur
var first = param.split("&");
for(i=0;i<first.length;i++){
    // idem à ci-dessus
    var second = first[i].split("=");
    switch(second[0]){
      case "nom":
        nom = second[1];
        break;
      case "prenom":
        prenom = second[1];
        break;
      case "adresse":
        adresse = second[1];
        break;
      default :
        console.log("Erreur formulaire");
        break;
    }
}
document.getElementById("information").innerHTML=nom+" "+ prenom +", merci pour votre commande! Elle a été envoyée à l'adresse : "+ adresse;
