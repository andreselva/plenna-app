import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Categories from "./Pages/Categories/Categories";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Expenses from "./Pages/Expenses/Expenses";

const App = () => {
    return (<Router>
        <div className="App">
            <Header/>
            <div className="MainContent">
                <Sidebar/>
                <div className="Content">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                        <Route path="/expenses" element={<Expenses/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    </Router>);
}


export default App;
