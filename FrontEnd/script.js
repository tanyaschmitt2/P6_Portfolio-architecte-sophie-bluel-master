//// Récupération de l'élément du DOM qui accueillera les works

const gallery = document.querySelector('.gallery');

//Fonction Async Main
async function main() {
    displayWorks ();
}

main ();


//Fonction d'appel API

async function getWorks() {
    try {
        const worksResponse = await fetch("http://localhost:5678/api/works");
        return worksResponse.json ();
     } catch (error){
        console.log("Erreur lors de la récupération des projets depuis l'API");
     };
    };
    
//Fonction createWorks in the gallery

function createWorks(work){
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = works.imgUrl;
    figcaption.innerText = work.title;
    figure.setAttribute("categorieId", work.category.id);

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
   

}



//Fonction pour l'affichage dynamics des éléments

async function displayWorks(categorieId) {
    try {
        const dataworks = await getWorks ();
        gallery.innerHTML = "";
       
       

        //Création des projets pour l'affichage dans les galleries
        dataworks.forEach((work) => {
            
                createWorks(work);
          
            })

    }catch (error) {
        console.log("erreur lors de l'affichage des projets");
    };

}


