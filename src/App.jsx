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
import { useAuth } from './Auth/Context/AuthContext';
import Reports from './Pages/Reports/Reports';
import FinancialSummary from './Pages/Reports/FinancialSummary';
import Users from './Pages/Users/Users';
import Appointments from './Pages/Appointments/Appointments';
import Tenants from './Pages/Tenants/Tenants';
import TenantDetails from './Pages/Tenants/TenantDetails';

const AppContent = () => {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuth();
    const showSidebar = !isLoading && isAuthenticated && location.pathname !== '/login' && location.pathname !== '/sitemap.xml';

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
                    <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                    <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                    <Route path="/reports/financial-summary" element={<PrivateRoute><FinancialSummary/></PrivateRoute>} />
                    <Route path="/appointments" element={<PrivateRoute><Appointments/></PrivateRoute>} />
                    <Route path="/tenants" element={<PrivateRoute><Tenants /></PrivateRoute>} />
                    <Route path="/tenants/:clientId" element={<PrivateRoute><TenantDetails /></PrivateRoute>} />
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
