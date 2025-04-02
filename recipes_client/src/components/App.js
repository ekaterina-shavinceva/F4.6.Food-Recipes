import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Category from "./Category";
import Recipe from "./Recipe";
import "../styles/App.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Categories />} />
                <Route path="/categories/:id" element={<Category />} />
                <Route path="/recipes/:id" element={<Recipe />} />
            </Routes>
        </Router>
    );
}

export default App;