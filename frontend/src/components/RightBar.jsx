import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour changer de page
import { Search } from "lucide-react"; // Optionnel, pour décorer

const RightBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      // Redirection vers la page de résultats
      navigate(`/search/${searchTerm}`);
      setSearchTerm(""); // On vide la barre après
    }
  };

  return (
    <div className="hidden lg:block w-80 sticky top-0 h-screen p-6 bg-gray-50 border-l border-gray-200 overflow-y-auto">
      {/* Search */}
      <div className="mb-6 relative">
        <input 
          type="text" 
          placeholder="Rechercher des posts..." 
          className="w-full bg-white p-3 pl-10 rounded-full border border-gray-200 focus:outline-blue-500 text-sm shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch} // Détecte la touche Entrée
        />
        {/* Petite loupe déco */}
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      </div>

      {/* ... Le reste du fichier (Trending, Who to follow) ne change pas ... */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Tendances pour vous</h3>
        <TrendItem category="Technologie" topic="#ReactJS" posts="12k posts" />
        <TrendItem category="Sport" topic="#JO2024" posts="58k posts" />
        <TrendItem category="Dev" topic="#OutlierAI" posts="2.4k posts" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-bold text-gray-800 mb-4">Qui suivre ?</h3>
        <FollowItem name="Elon Musk" handle="@elonmusk" />
        <FollowItem name="React Official" handle="@reactjs" />
      </div>
    </div>
  );
};

// ... Les composants TrendItem et FollowItem ne changent pas ...
const TrendItem = ({ category, topic, posts }) => (
  <div className="mb-4 last:mb-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
    <p className="text-xs text-gray-500">{category}</p>
    <p className="font-bold text-gray-800">{topic}</p>
    <p className="text-xs text-gray-400">{posts}</p>
  </div>
);

const FollowItem = ({ name, handle }) => (
  <div className="flex items-center justify-between mb-4 last:mb-0">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      <div className="text-sm">
        <p className="font-bold">{name}</p>
        <p className="text-gray-500 text-xs">{handle}</p>
      </div>
    </div>
    <button className="bg-black text-white text-xs px-3 py-1 rounded-full hover:bg-gray-800">
      Suivre
    </button>
  </div>
);

export default RightBar;