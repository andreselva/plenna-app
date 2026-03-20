import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import PrivateRoute from './Auth/PrivateRoute';
import { useAuth } from './Auth/Context/AuthContext';
import appRoutes from './routes/appRoutes';

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const isPublicAuthRoute =
    location.pathname === '/login' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/reset-password' ||
    location.pathname === '/sitemap.xml';

  const showSidebar = !isLoading && isAuthenticated && !isPublicAuthRoute;

  return (
    <div className="MainContent">
      {showSidebar && <Sidebar />}
      <div className="Content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {appRoutes.map((route) => {
            const isPublic = route.meta?.isPublic;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  isPublic ? (
                    route.element
                  ) : (
                    <PrivateRoute accessPath={route.meta?.accessPath || route.path}>
                      {route.element}
                    </PrivateRoute>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;