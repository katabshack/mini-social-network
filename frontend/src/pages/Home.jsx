import { useEffect, useState, useContext } from "react";
import { Menu, Search } from "lucide-react"; 
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

import API from "../services/api";
import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar"; 
import RightBar from "../components/RightBar"; 
import BottomNav from "../components/BottomNav"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State pour la recherche mobile
  const [mobileSearch, setMobileSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      // Le backend trie déjà par date, pas besoin de reverse()
      setPosts(res.data); 
    } catch (error) {
      console.error("Erreur fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fonction pour gérer la recherche mobile
  const handleMobileSearch = (e) => {
    if (e.key === "Enter" && mobileSearch.trim()) {
      navigate(`/search/${mobileSearch}`);
      setMobileSearch("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      
      {/* Conteneur Principal Centré */}
      <div className="max-w-7xl mx-auto flex justify-center">

        {/* 1. Sidebar Gauche */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* 2. Contenu Principal (Feed) */}
        <div className="flex-1 max-w-2xl min-h-screen pb-20 border-x border-gray-200 bg-white"> 
          
          <div className="py-4 px-4">
            
            {/* --- BLOC STICKY MOBILE (Header + Recherche) --- */}
            <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 -mx-4 px-4 pt-2 pb-3 mb-4 transition-all shadow-sm">
              
              {/* Ligne 1 : Menu - Titre - Avatar */}
              <div className="flex justify-between items-center mb-3">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition"
                  >
                    <Menu size={28} />
                  </button>
                  
                  <h1 className="text-xl font-bold text-blue-600">MiniSocial</h1>
                  
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                    {user?.username?.charAt(0)}
                  </div>
              </div>

              {/* Ligne 2 : Barre de Recherche Mobile */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-gray-100 text-gray-800 p-2.5 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  onKeyDown={handleMobileSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

            </div>
            {/* --- FIN BLOC STICKY MOBILE --- */}


            {/* Titre Desktop (Caché sur mobile) */}
            <h1 className="text-xl font-bold mb-6 hidden lg:block px-2">Accueil</h1>

            {/* Formulaire de création de post */}
            <CreatePostForm onPostCreated={fetchPosts} />

            {/* Liste des posts */}
            {loading ? (
              <div className="flex justify-center mt-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">Rien à voir ici...</p>
            )}
          </div>
        </div>

        {/* 3. Sidebar Droite */}
        <RightBar />

      </div>

      {/* 4. Menu Mobile (Caché si la Sidebar est ouverte) */}
      {!isSidebarOpen && <BottomNav />}

    </div>
  );
};

export default Home;