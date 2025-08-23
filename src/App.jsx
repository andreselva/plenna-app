import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from "./Components/Sidebar/Sidebar";
import Categories from "./Pages/Categories/Categories";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Expenses from "./Pages/Expenses/Expenses";
import Revenues from "./Pages/Revenues/Revenues";
import { BankAccounts } from './Pages/BankAccounts/BankAccounts';
import Signin from './Pages/Signin/Signin';
import PrivateRoute from './Auth/PrivateRoute';
import Invoices from './Pages/Invoices/Invoices';
import NotFound from './Pages/NotFound/NotFound';
import { AuthProvider, useAuth } from './Auth/Context/AuthContext';

const AppContent = () => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuth();
    const showSidebar = !isLoading && isAuthenticated;

    return (
        <div className="MainContent">
            {showSidebar && <Sidebar />}
            <div className="Content">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/login" element={<Signin />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
                    <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
                    <Route path="/revenues" element={<PrivateRoute><Revenues /></PrivateRoute>} />
                    <Route path="/bank-accounts" element={<PrivateRoute><BankAccounts /></PrivateRoute>} />
                    <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

const App = () => {
    return (
        <Router>
            <div className="App">
                <AppContent />
            </div>
        </Router>
    );
}

export default App;
