const search = document.querySelector('#search');
const searchbutton = document.querySelector('#searchbutton');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContainer = document.querySelector('.recipe-details-container');
const repclose = document.querySelector('#repclose');

async function fetchmeal() {
    recipeContainer.innerHTML = "<h2> fetching recipes</h2>";
    const getmeal = document.getElementById("search").value.toLowerCase();
    try {
        const reply = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getmeal}`);
        if (!reply.ok) {
            throw new Error("could not fetch data");
        }
        recipeContainer.innerHTML = "   ";
        const data = await reply.json();
        data.meals.forEach(meal => {
            const recpdiv = document.createElement('div');
            recpdiv.classList.add('recipe');
            if (meal.strMealThumb) {
                recpdiv.innerHTML = `<img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
               <p><span>${meal.strArea} Dish </span></p>
               <p>${meal.strCategory}</p>
                `;
                const btn =document.createElement('button');
                btn.textContent="View Recipe";
                recpdiv.appendChild(btn);
                btn.addEventListener('click',()=>{
                    openRecipePopup(meal);
                });
            } else {
                console.log("Image not found for:", meal.strMeal); 
            }
            recipeContainer.appendChild(recpdiv);
        });
    } catch (error) {
        console.log(error);
    }
}

searchbutton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchmeal();
});
const fetchIngredient   = (meal)=> {
    let inglist="";
    for (let i=1; i<=20; i++){
        const ings=meal[`strIngredient${i}`];
        if(ings){
            const masure=meal[`strMeasure${i}`];
            inglist+= `<li>${masure}${ings}</li>`
        }
        else{ 
            break;
        }
    }
    return inglist;
}
const openRecipePopup=(meal)=>{
    recipeDetailsContainer.innerHTML=`
    <h2>${meal.strMeal}</h2>
    <h3>Ingredient</h3>
    <ul>${fetchIngredient(meal)}</ul>
    <div>
    <h3>instructions</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContainer.parentElement.style.display="block";
}
repclose.addEventListener('click',()=>{recipeDetailsContainer.parentElement.style.display="none"})