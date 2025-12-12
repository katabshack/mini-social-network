import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; // <--- Nouveau
import ComposePost from "./pages/ComposePost"; // <--- Nouveau
import ComingSoon from "./pages/ComingSoon"; // <--- Nouveau
import SearchResults from "./pages/SearchResults"; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ROUTES PROTÉGÉES */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/search/:query" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
        <Route path="/compose" element={<PrivateRoute><ComposePost /></PrivateRoute>} />
        
        {/* Pages Fictives */}
        <Route path="/notifications" element={
          <PrivateRoute>
            <ComingSoon title="Notifications" message="Vous n'avez pas encore de notifications." />
          </PrivateRoute>
        } />
        <Route path="/messages" element={
          <PrivateRoute>
            <ComingSoon title="Messagerie" message="Les messages privés arrivent bientôt !" />
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute>
            <ComingSoon title="Paramètres" message="Configurez votre compte ici prochainement." />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default App;