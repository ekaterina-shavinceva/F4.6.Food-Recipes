import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Categories.css"


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/categories/"
                );
                setCategories(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div className='categories'>
            <h2>Список категорий</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
