import { Home, User, LogOut, PlusSquare } from "lucide-react"; // Retour de PlusSquare
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  // Fonction pour vérifier si on est sur la page
  const isActive = (path) => location.pathname === path;

  // Classe utilitaire pour le style des boutons (pour éviter de répéter le code)
  const getLinkClass = (path) => 
    `flex flex-col items-center transition-colors duration-200 ${isActive(path) ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        
        {/* Accueil */}
        <Link to="/" className={getLinkClass('/')}>
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] mt-1">Accueil</span>
        </Link>

        {/* Post (Retour au style carré PlusSquare) */}
        <Link to="/compose" className={getLinkClass('/compose')}>
          <PlusSquare size={26} strokeWidth={isActive('/compose') ? 2.5 : 2} />
          <span className="text-[10px] mt-1">Post</span>
        </Link>

        {/* Profil */}
        <Link to="/profile" className={getLinkClass('/profile')}>
          <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
          <span className="text-[10px] mt-1">Profil</span>
        </Link>

        {/* Déconnexion */}
        <button onClick={logout} className="flex flex-col items-center text-red-400 hover:text-red-600 transition-colors">
          <LogOut size={24} />
          <span className="text-[10px] mt-1">Sortir</span>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;