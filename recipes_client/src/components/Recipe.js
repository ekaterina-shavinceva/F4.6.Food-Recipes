import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../styles/Recipe.css"


const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/recipes/${id}/`
                ); // Замените на ваш API
                setRecipe(response.data);
            } catch (err) {
                setError(err);
                console.error("Ошибка при загрузке рецепта:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <p>Загрузка...</p>; // Показываем сообщение, пока данные загружаются
    if (error) return <p>Ошибка: {error.message}</p>; // Обработка ошибок

    let ingredientsArray;
    if (typeof recipe.ingredients === "string") {
        ingredientsArray = recipe.ingredients
            .split(",")
            .map((ingredient) => ingredient.trim());
    } else if (Array.isArray(recipe.ingredients)) {
        ingredientsArray = recipe.ingredients;
    } else {
        return <p>Ошибка: ингредиенты не найдены.</p>;
    }

    return (
        <div className="recipe">
            <h2>{recipe.title}</h2>
            <h3>Ингредиенты:</h3>
            <ul>
                {ingredientsArray.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Рецепт:</h3>
            <p>{recipe.instructions}</p>
        </div>
    );
};

export default Recipe;
