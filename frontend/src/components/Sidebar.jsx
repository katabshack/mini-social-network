import { Home, User, Settings, LogOut, Bell, MessageSquare, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 w-64 p-6 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:sticky lg:top-0 lg:flex lg:flex-col lg:h-screen
        
        overflow-y-auto /* <--- C'EST LA CORRECTION MAGIQUE ICI */
      `}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 shrink-0"> {/* shrink-0 empêche le logo de s'écraser */}
          <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <div className="bg-blue-600 text-white p-1 rounded-lg">MS</div>
            MiniSocial
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 mb-6">
          <SidebarItem to="/" icon={<Home size={20} />} text="Fil d'actualité" />
          <SidebarItem to="/notifications" icon={<Bell size={20} />} text="Notifications" />
          <SidebarItem to="/messages" icon={<MessageSquare size={20} />} text="Messages" />
          <SidebarItem to="/profile" icon={<User size={20} />} text="Mon Profil" />
          <SidebarItem to="/settings" icon={<Settings size={20} />} text="Paramètres" />
        </nav>

        {/* Footer User */}
        <div className="border-t pt-4 mt-auto shrink-0 pb-4"> {/* shrink-0 empêche le bas d'être coupé */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
              {user?.username?.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">{user?.username}</p>
              <p className="text-xs text-gray-500">@{user?.username?.toLowerCase()}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full p-2 rounded-lg transition font-medium"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, text, to }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`
        flex items-center gap-3 p-3 rounded-xl transition-colors duration-200
        ${active ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600 hover:bg-gray-100"}
      `}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Sidebar;