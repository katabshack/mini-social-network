import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { MapPin, Calendar, Link as LinkIcon } from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="flex justify-center max-w-7xl mx-auto">
        {/* Sidebar Desktop */}
        <Sidebar />

        <div className="flex-1 max-w-2xl min-h-screen pb-20 border-x border-gray-200 bg-white">
          
          {/* 1. Bannière (Image fictive) */}
          <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative"></div>

          {/* 2. Infos Profil */}
          <div className="px-4 pb-4">
            {/* Avatar qui chevauche la bannière */}
            <div className="relative -mt-16 mb-4 flex justify-between items-end">
              <div className="w-32 h-32 bg-white rounded-full p-1">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 uppercase border-4 border-white">
                  {user?.username?.charAt(0)}
                </div>
              </div>
              <button className="border border-gray-300 font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition">
                Éditer le profil
              </button>
            </div>

            {/* Textes */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
              <p className="text-gray-500">@{user?.username?.toLowerCase()}</p>
            </div>

            <p className="mt-4 text-gray-700">
              Développeur Passionné 💻 | Fan de React ⚛️ | J'adore tester de nouvelles applications !
            </p>

            {/* Méta-données */}
            <div className="flex flex-wrap gap-4 mt-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> Paris, France
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon size={16} /> <span className="text-blue-500">github.com/{user?.username}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} /> A rejoint en Décembre 2025
              </div>
            </div>

            {/* Stats (Fictives pour l'instant) */}
            <div className="flex gap-6 mt-4">
              <div className="flex gap-1">
                <span className="font-bold text-gray-900">142</span>
                <span className="text-gray-500">Abonnements</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold text-gray-900">3.5k</span>
                <span className="text-gray-500">Abonnés</span>
              </div>
            </div>
          </div>

          {/* 3. Tabs (Onglets) */}
          <div className="flex border-b border-gray-200 mt-4">
            <div className="flex-1 text-center py-4 font-bold text-blue-600 border-b-2 border-blue-600 cursor-pointer hover:bg-gray-50">
              Posts
            </div>
            <div className="flex-1 text-center py-4 text-gray-500 cursor-pointer hover:bg-gray-50">
              Réponses
            </div>
            <div className="flex-1 text-center py-4 text-gray-500 cursor-pointer hover:bg-gray-50">
              J'aime
            </div>
          </div>

          {/* Contenu vide pour l'instant */}
          <div className="p-8 text-center text-gray-500">
            Aucun post à afficher pour l'instant.
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;