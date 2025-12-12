import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext); // On récupère l'utilisateur connecté
  
  // États pour les Likes
  const [likes, setLikes] = useState(post.likes || []);
  const isLiked = likes.includes(user?._id || user?.id); // Vérifie si JE l'ai déjà liké

  // États pour les Commentaires
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  // --- GESTION DES LIKES ---
  const handleLike = async () => {
    try {
      // Note: Assure-toi que ta route backend est bien PUT ou POST selon ton code Node
      const res = await API.put(`/posts/${post._id}/like`);
      
      // Le backend doit renvoyer la nouvelle liste de likes
      // Si ton backend renvoie tout le post, utilise res.data.likes
      // Ici je suppose qu'il renvoie le tableau de likes mis à jour
      setLikes(res.data); 
    } catch (error) {
      console.error("Erreur like:", error);
      toast.error("Impossible de liker");
    }
  };

  // --- GESTION DES COMMENTAIRES ---
  
  // 1. Charger les commentaires quand on clique sur le bouton
  const toggleComments = async () => {
    setShowComments(!showComments);
    
    // Si on ouvre et qu'on n'a pas encore chargé les commentaires
    if (!showComments && comments.length === 0) {
      setLoadingComments(true);
      try {
        const res = await API.get(`/comments/post/${post._id}`);
        setComments(res.data);
      } catch (error) {
        console.error("Erreur chargement commentaires", error);
      } finally {
        setLoadingComments(false);
      }
    }
  };

  // 2. Envoyer un nouveau commentaire
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post("/comments", {
        postId: post._id,
        content: newComment,
      });

      // --- LE FIX EST ICI ---
      // On construit un objet commentaire "hybride" pour l'affichage immédiat
      const commentToDisplay = {
        ...res.data, // On garde l'ID du commentaire et le contenu renvoyés par le serveur
        userId: { 
          // On force l'objet user avec TES infos actuelles (venant du Context)
          _id: user._id || user.id, 
          username: user.username 
        }
      };
      
      // On ajoute ce commentaire "complet" à la liste
      setComments([...comments, commentToDisplay]);
      
      setNewComment(""); // Vider l'input
      toast.success("Commentaire ajouté !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur envoi commentaire");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* --- En-tête --- */}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 uppercase">
          {post.userId?.username?.charAt(0) || "?"}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">
            {post.userId?.username || "Utilisateur inconnu"}
          </h3>
          <span className="text-xs text-gray-500">
             {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* --- Contenu --- */}
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* --- Boutons Actions --- */}
      <div className="border-t pt-3 flex items-center gap-6 text-gray-500 text-sm">
        
        {/* BOUTON LIKE */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 transition ${isLiked ? "text-red-500 font-bold" : "hover:text-red-500"}`}
        >
          {isLiked ? "❤️" : "🤍"} {likes.length} J'aime
        </button>

        {/* BOUTON COMMENTAIRE */}
        <button 
          onClick={toggleComments}
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          💬 {showComments ? "Masquer" : "Commenter"}
        </button>
      </div>

      {/* --- SECTION COMMENTAIRES (Affichée si showComments est vrai) --- */}
      {showComments && (
        <div className="mt-4 pt-3 border-t bg-gray-50 p-3 rounded-md">
          
          {/* Liste des commentaires */}
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {loadingComments ? (
              <p className="text-xs text-gray-400">Chargement...</p>
            ) : comments.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="text-sm">
                  <span className="font-bold text-gray-800">{c.userId?.username} : </span>
                  <span className="text-gray-600">{c.content}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">Aucun commentaire.</p>
            )}
          </div>

          {/* Formulaire d'ajout */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 p-2 border rounded-md text-sm focus:outline-blue-400"
              placeholder="Écrire un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
              disabled={!newComment.trim()}
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;