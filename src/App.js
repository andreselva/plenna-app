import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="MainContent">
                    <Sidebar/>
                    <div className="Content">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
