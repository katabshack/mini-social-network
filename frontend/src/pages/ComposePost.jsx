import { useState, useRef } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X, Image } from "lucide-react"; // Ajout de Image

const ComposePost = () => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  
  // Référence pour l'input caché
  const fileInputRef = useRef();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage) return;
    
    // On utilise FormData pour envoyer l'image
    const formData = new FormData();
    formData.append("content", content);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await API.post("/posts", formData);
      toast.success("Post publié !");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Erreur publication");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <X size={24} />
        </button>
        <button 
          onClick={handleSubmit}
          disabled={!content.trim() && !selectedImage}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 text-sm"
        >
          Publier
        </button>
      </div>

      {/* Zone de texte */}
      <textarea
        autoFocus
        className="w-full flex-1 text-xl p-2 border-none focus:outline-none resize-none placeholder-gray-400"
        placeholder="Quoi de neuf ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {/* Prévisualisation Image */}
      {preview && (
        <div className="relative mb-4 mx-2">
          <img src={preview} alt="Aperçu" className="rounded-xl max-h-60 object-cover w-full shadow-sm" />
          <button 
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Barre d'outils (en bas, au dessus du clavier) */}
      <div className="border-t border-gray-100 py-3 flex gap-4 text-blue-600">
        <button onClick={handleIconClick} className="p-2 bg-blue-50 rounded-full">
          <Image size={24} />
        </button>
        {/* Input caché */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ComposePost;