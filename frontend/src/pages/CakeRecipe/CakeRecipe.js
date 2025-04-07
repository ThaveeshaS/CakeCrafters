import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CakeRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample recipe data
  const sampleRecipes = [
    {
      id: 1,
      title: "Classic Vanilla Sponge Cake",
      author: "Chef Maria",
      date: "2023-05-15",
      prepTime: "30 mins",
      cookTime: "25 mins",
      servings: 8,
      difficulty: "Intermediate",
      ingredients: [
        "2 1/2 cups all-purpose flour",
        "2 1/2 tsp baking powder",
        "1/2 tsp salt",
        "1 cup unsalted butter, softened",
        "2 cups granulated sugar",
        "4 large eggs",
        "1 tbsp vanilla extract",
        "1 cup whole milk"
      ],
      instructions: [
        "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
        "In a medium bowl, whisk together flour, baking powder, and salt.",
        "In a large bowl, beat butter and sugar until light and fluffy (about 3-4 minutes).",
        "Add eggs one at a time, beating well after each addition. Mix in vanilla.",
        "Alternately add flour mixture and milk, beginning and ending with flour mixture.",
        "Divide batter evenly between prepared pans. Bake for 25-30 minutes until a toothpick comes out clean.",
        "Cool in pans for 10 minutes, then transfer to wire racks to cool completely."
      ],
      tips: "For extra moistness, brush the cooled cake layers with simple syrup before frosting."
    },
    {
      id: 2,
      title: "Decadent Chocolate Fudge Cake",
      author: "Baker John",
      date: "2023-06-20",
      prepTime: "20 mins",
      cookTime: "35 mins",
      servings: 10,
      difficulty: "Easy",
      ingredients: [
        "1 3/4 cups all-purpose flour",
        "2 cups granulated sugar",
        "3/4 cup unsweetened cocoa powder",
        "1 1/2 tsp baking powder",
        "1 1/2 tsp baking soda",
        "1 tsp salt",
        "2 large eggs",
        "1 cup whole milk",
        "1/2 cup vegetable oil",
        "2 tsp vanilla extract",
        "1 cup boiling water"
      ],
      instructions: [
        "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
        "In a large bowl, sift together dry ingredients.",
        "Add eggs, milk, oil and vanilla. Beat on medium speed for 2 minutes.",
        "Stir in boiling water (batter will be thin).",
        "Pour evenly into prepared pans. Bake for 30-35 minutes until tests done.",
        "Cool in pans for 10 minutes, then remove to wire racks to cool completely."
      ],
      tips: "This cake is extra moist - refrigerate for easier handling when frosting."
    }
  ];

  const recipe = sampleRecipes.find(recipe => recipe.id === parseInt(id)) || sampleRecipes[0];
  const [servingSize, setServingSize] = useState(recipe.servings);

  const adjustServings = (factor) => {
    const newSize = servingSize * factor;
    if (newSize >= 1 && newSize <= 20) {
      setServingSize(newSize);
    }
  };

  const calculateIngredient = (ingredient) => {
    if (ingredient.match(/\d+\s*\d*\/\d*/)) {
      return ingredient.replace(/(\d+\s*\d*\/\d*)/g, (match) => {
        const parts = match.split(' ');
        if (parts.length === 1) {
          const fraction = parts[0].split('/');
          if (fraction.length === 2) {
            const numerator = parseFloat(fraction[0]);
            const denominator = parseFloat(fraction[1]);
            const decimal = numerator / denominator;
            const adjusted = decimal * (servingSize / recipe.servings);
            return toFraction(adjusted);
          }
          return (parseFloat(parts[0]) * (servingSize / recipe.servings)).toFixed(1);
        } else {
          const whole = parseFloat(parts[0]);
          const fractionParts = parts[1].split('/');
          const numerator = parseFloat(fractionParts[0]);
          const denominator = parseFloat(fractionParts[1]);
          const decimal = whole + (numerator / denominator);
          const adjusted = decimal * (servingSize / recipe.servings);
          return toFraction(adjusted);
        }
      });
    }
    return ingredient;
  };

  const toFraction = (number) => {
    const tolerance = 1.0E-6;
    const fractions = [
      [0, ''],
      [1/4, '¼'],
      [1/3, '⅓'],
      [1/2, '½'],
      [2/3, '⅔'],
      [3/4, '¾']
    ];
    
    const whole = Math.floor(number);
    let remainder = number - whole;
    
    if (remainder < tolerance) return whole.toString();
    
    for (let i = 0; i < fractions.length; i++) {
      if (Math.abs(remainder - fractions[i][0]) < tolerance) {
        return whole ? `${whole} ${fractions[i][1]}` : fractions[i][1];
      }
    }
    
    return number.toFixed(1);
  };

  return (
    <div className="container py-5">
      {/* Create Recipe Button - Top Right */}
      <div className="d-flex justify-content-end mb-4">
        <Link to="/createrecipe" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i> Create Cake Recipe
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Recipe Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">{recipe.title}</h1>
            <div className="d-flex justify-content-center gap-4 mb-3">
              <span className="text-muted"><i className="bi bi-person-fill"></i> By {recipe.author}</span>
              <span className="text-muted"><i className="bi bi-calendar"></i> {recipe.date}</span>
            </div>
            <div className="d-flex justify-content-center gap-4">
              <span className="badge bg-primary"><i className="bi bi-clock"></i> Prep: {recipe.prepTime}</span>
              <span className="badge bg-secondary"><i className="bi bi-egg-fried"></i> Cook: {recipe.cookTime}</span>
              <span className="badge bg-success">
                <i className="bi bi-people-fill"></i> 
                <button className="btn btn-sm btn-outline-light mx-1" onClick={() => adjustServings(0.5)}>-</button>
                {servingSize} Servings
                <button className="btn btn-sm btn-outline-light mx-1" onClick={() => adjustServings(2)}>+</button>
              </span>
              <span className="badge bg-warning text-dark"><i className="bi bi-speedometer2"></i> {recipe.difficulty}</span>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3"><i className="bi bi-cup-straw"></i> Ingredients</h2>
              <ul className="list-group list-group-flush">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {calculateIngredient(ingredient)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3"><i className="bi bi-list-ol"></i> Instructions</h2>
              <ol className="list-group list-group-numbered">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="list-group-item">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {recipe.tips && (
            <div className="card mb-4 border-info">
              <div className="card-header bg-info text-white">
                <i className="bi bi-lightbulb-fill"></i> Baker's Tip
              </div>
              <div className="card-body">
                <p>{recipe.tips}</p>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left"></i> Back to Recipes
            </button>
            <button className="btn btn-danger">
              <i className="bi bi-printer"></i> Print Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeRecipe;