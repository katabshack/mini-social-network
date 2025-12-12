import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { Construction } from "lucide-react";
import { Link } from "react-router-dom";

const ComingSoon = ({ title, message }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      
      {/* Sidebar Desktop */}
      <Sidebar />
      
      {/* Contenu Principal */}
      <div className="flex-1 max-w-2xl min-h-screen bg-white border-x border-gray-200 flex flex-col relative">
        
        {/* Zone de contenu scrollable */}
        {/* overflow-y-auto : permet le scroll si l'écran est petit */}
        {/* pb-24 : laisse de la place pour le menu du bas */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto pb-24">
          
          <div className="bg-blue-100 p-6 rounded-full mb-6 mt-10">
            <Construction size={64} className="text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-500 text-lg mb-8">{message}</p>
          
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Retour à l'accueil
          </Link>

          {/* Espace vide en bas pour être sûr qu'on peut scroller jusqu'au bout */}
          <div className="h-10"></div>
        </div>

      </div>
      
      {/* Menu Mobile */}
      <BottomNav />
    </div>
  );
};

export default ComingSoon;