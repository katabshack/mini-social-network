import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const ComposePost = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await API.post("/posts", { content });
      toast.success("Post publié !");
      navigate("/"); // Retour à l'accueil
    } catch (error) {
      toast.error("Erreur publication");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header simple */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <X size={24} />
        </button>
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50"
        >
          Publier
        </button>
      </div>

      {/* Zone de texte géante */}
      <textarea
        autoFocus
        className="w-full h-64 text-xl p-2 border-none focus:outline-none resize-none"
        placeholder="Quoi de neuf ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default ComposePost;