import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/Category.css';

const Category = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categories/${id}/`)
            .then(response => setCategory(response.data))
            .catch(error => console.log(error));

        axios.get(`http://localhost:8000/api/recipes/?category=${id}`)
            .then(response => setRecipes(response.data))
            .catch(error => console.log(error));
    }, [id]);

    if (!category) return <div>Загрузка...</div>;

    return (
        <div className="recipe-list">
            <h2>Рецепты категории: {category.name}</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Category;
