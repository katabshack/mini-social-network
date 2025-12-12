import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Pour récupérer le mot clé dans l'URL
import API from "../services/api";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import RightBar from "../components/RightBar";
import BottomNav from "../components/BottomNav";
import { Search, ArrowLeft } from "lucide-react";

const SearchResults = () => {
  const { query } = useParams(); // On récupère ce qu'il y a après /search/...
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/posts/search/${query}`);
        setPosts(res.data.reverse());
      } catch (error) {
        console.error("Erreur recherche", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]); // Re-exécute si le mot clé change

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex justify-center">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 max-w-2xl min-h-screen pb-20 border-x border-gray-200 bg-white">
        <div className="py-4 px-4">
          
          {/* En-tête simple */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Search size={20} className="text-gray-400" />
              Résultats pour "{query}"
            </h1>
          </div>

          {/* Liste des résultats */}
          {loading ? (
            <div className="text-center mt-10">Recherche en cours...</div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-500 font-bold">Aucun résultat trouvé.</p>
              <p className="text-gray-400 text-sm">Essayez un autre mot clé.</p>
            </div>
          )}
        </div>
      </div>

      <RightBar />
      
      {!isSidebarOpen && <BottomNav />}
    </div>
  );
};

export default SearchResults;