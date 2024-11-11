//// Récupération de l'élément du DOM qui accueillera les works

const gallery = document.querySelector('.gallery');
const filters = document.querySelector('.filters');

//Fonction Async Main
async function main() {
    displayWorks ();
    displayFilters();
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

    img.src = work.imageUrl;
    figcaption.innerText = work.title;
    figure.setAttribute("categorieId", work.category.id);

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
   

}

function createBtnFilter(category){
    const btnCategorie = document.createElement("button");
    btnCategorie.innerText = category.name;
    btnCategorie.setAttribute("class", "filterButton")
    btnCategorie.setAttribute("buttonId", category.id);
    filters.appendChild(btnCategorie);
   

}



//Fonction pour l'affichage dynamics des éléments

async function displayWorks(categorieId) {
    try {
        const dataworks = await getWorks ();
        gallery.innerHTML = "";
       
       

        //Création des projets pour l'affichage dans les galleries
        dataworks.forEach((work) => {
            if (categorieId == work.category.id || categorieId == null) {
                createWorks(work);
            }
          
        })

    }catch (error) {
        console.log("erreur lors de l'affichage des projets");
    };

}



//-----------------CATEGORIES---------------


async function getCategories() {
    try {
        const categoriesResponse = await fetch("http://localhost:5678/api/categories");
        return await categoriesResponse.json();
    } catch (error) {
        console.log("Erreur lors de la récupération des catégories depuis l'API");
    };
};

// Boutons filtres par catégories
async function displayFilters() {

    const dataCategories = await getCategories();
    

    // Créations des boutons
    dataCategories.forEach((category) => {
        
        createBtnFilter(category)
    });

    // Ajout d'un event au clic sur chaque bouton
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            let categorieId = button.getAttribute("buttonId");
            buttons.forEach((button) => button.classList.remove("filterButtonActive"));
            this.classList.add("filterButtonActive");
            displayWorks(categorieId);
        });
    });
};


