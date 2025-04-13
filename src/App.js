import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from "./Components/Sidebar/Sidebar";
import Categories from "./Pages/Categories/Categories";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Expenses from "./Pages/Expenses/Expenses";
import Revenues from "./Pages/Revenues/Revenues";

const App = () => {
    return (<Router>
        <div className="App">
            <div className="MainContent">
                <Sidebar />
                <div className="Content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/revenues" element={<Revenues />} />
                    </Routes>
                </div>
            </div>
        </div>
    </Router>);
}


export default App;
