'use strict';

const fetchIngredients = async () => {
    const ingrCont = document.getElementById('ingredient-data');
    const ingrModalCont = document.getElementById('edit-ingredients');
    const dialog = document.getElementById('edit-ingredients-dialog');

    const response = await fetch ('/ingredients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const ingredients = await response.json();

    const html = `<li class="this-igt">${ingredients.ingredients[0].name}</li>
                <li class="this-igt">${ingredients.ingredients[1].name}</li>
                <li class="this-igt">${ingredients.ingredients[2].name}</li>
                <li class="this-igt">${ingredients.ingredients[3].name}</li>`;
    ingrCont.insertAdjacentHTML('beforeend', html);

    for (let igt of ingredients.ingredients) {

        let html = `<table>
            <thead>
                <tr>
                    <th colspan="2" class="ingredient-name"><b>${igt.name}</b> (ID: ${igt.ingredient_id})</th>
                </tr>
            </thead>
            <tbody id="ing-table-body">
            <tr>
                <th>Portion size</th>
                <td>${igt.portion_size}</td>
            </tr>
            <tr>
                <th>Price</th>
                <td>${igt.price} €</td>
            </tr>
            <tr>
                <th>Calories</th>
                <td>${igt.calories} kcal</td>
            </tr>
            <tr>
                <th>Carbs</th>
                <td>${igt.carbs} g/100g</td>
            </tr>
            <tr>
                <th>Protein</th>
                <td>${igt.protein} g/100g</td>
            </tr>
            <tr>
                <th>Fats</th>
                <td>${igt.fats} g/100g</td>
            </tr>
            <tr>
                <th>Qty in stock</th>
                <td>${igt.in_stock}</td>
            </tr>
            </tbody>
        </table>`;
        ingrModalCont.insertAdjacentHTML('beforeend', html);

    }
};

export default fetchIngredients;