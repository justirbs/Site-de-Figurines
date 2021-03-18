/*Pour récupérer les informations du formulaire */

// on cherche les paramètres
let params = (new URL(window.location)).searchParams;
// on récupère les valeurs des paramètres
nom = params.get('nom');
prenom = params.get('prenom');
adresse = params.get('adresse');
document.getElementById("information").innerHTML=nom+" "+ prenom +", merci pour votre commande! Elle a été envoyée à l'adresse : "+ adresse;
