import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {

  const { user } = useContext(AuthContext);
  
  // États
  const [likes, setLikes] = useState(post.likes || []);
  const isLiked = likes.includes(user?._id || user?.id);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  // --- LIKES ---
  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/${post._id}/like`);
      setLikes(res.data); 
    } catch (error) {
      console.error("Erreur like:", error);
      toast.error("Impossible de liker");
    }
  };

  // --- COMMENTAIRES ---
  const toggleComments = async () => {
    setShowComments(!showComments);
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post("/comments", {
        postId: post._id,
        content: newComment,
      });

      const commentToDisplay = {
        ...res.data, 
        userId: { 
          _id: user._id || user.id, 
          username: user.username 
        }
      };
      
      setComments([...comments, commentToDisplay]);
      setNewComment("");
      toast.success("Commentaire ajouté !");
    } catch (error) {
      toast.error("Erreur envoi commentaire");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* En-tête */}
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

      {/* Contenu Texte */}
      <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>

      {/* --- C'EST ICI QU'ON AFFICHE L'IMAGE --- */}
      {post.image && (
        <div className="mb-4">
          <img 
            src={post.image} 
            alt="Post content" 
            className="rounded-lg w-full object-cover max-h-96 border border-gray-100"
            loading="lazy" 
          />
        </div>
      )}
      {/* --------------------------------------- */}

      {/* Boutons Actions */}
      <div className="border-t pt-3 flex items-center gap-6 text-gray-500 text-sm">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 transition ${isLiked ? "text-red-500 font-bold" : "hover:text-red-500"}`}
        >
          {isLiked ? "❤️" : "🤍"} {likes.length} J'aime
        </button>

        <button 
          onClick={toggleComments}
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          💬 {showComments ? "Masquer" : "Commenter"}
        </button>
      </div>

      {/* Section Commentaires */}
      {showComments && (
        <div className="mt-4 pt-3 border-t bg-gray-50 p-3 rounded-md">
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