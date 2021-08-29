const searchFood = () => {
    const searchInput = document.getElementById('search_input');
    const searchText = searchInput.value;
    searchInput.value = '';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data.meals))
}


const displayFood = meals => {
    // console.log(meals)
    const searchDiv = document.getElementById('search_list_item');
    for(const meal of meals) {
        // console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> ${meal.strMeal} </h5>
                    <p class="card-text">
                        ${meal.strInstructions.slice(0, 50)}
                    </p>
                    <button onclick="loadDetail('${meal.idMeal}')" class="btn bg-primary text-white fw-bold"> More Info </button>
                </div>
            </div>
        `;
        searchDiv.appendChild(div);
    }
}

const loadDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFoodDetail(data.meals[0]))
}

const displayFoodDetail = meal => {
    console.log(meal)
   const singleDiv = document.getElementById('single_meal');
   singleDiv.textContent = '';
   const div = document.createElement('div');
   div.innerHTML = `
    <div class="row g-0 border border-primary border-1 shadow rounded">
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title"> ${meal.strMeal} </h5>
            <p class="card-text">
                ${meal.strInstructions.slice(0, 150)}
            </p>
            <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
            </p>
        </div>
        </div>
    </div>
   `;
   singleDiv.appendChild(div);
   window.scrollTo(0, 40);
}

