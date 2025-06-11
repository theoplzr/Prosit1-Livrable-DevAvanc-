import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Social() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Assurez-vous que votre backend est lancé et accessible sur http://localhost:3000
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des posts:", err);
        setError('Impossible de charger les posts. Veuillez vérifier que le backend est en cours d\'exécution.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois (au montage du composant)

  if (loading) {
    return <div className="p-4">Chargement des posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Erreur: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mini-réseau Social</h1>
      <p className="mb-4">Contenu du réseau social. Voici les posts récupérés de l'API backend :</p>

      {posts.length === 0 ? (
        <p>Aucun post trouvé pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-2">{post.content}</p>
              <p className="text-sm text-gray-500">Auteur: {post.author}</p>
              <p className="text-xs text-gray-400">Créé le: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 