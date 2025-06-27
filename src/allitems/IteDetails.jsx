// src/pages/Tip.jsx
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Loading_spinner from "../components/Loading_spinner";

const API = import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

const IteDetails = () => {
  const { id } = useParams();  // URL থেকে id ধরবে
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}tips/${id}`)  // API থেকে স্পেসিফিক টিপ আনবে
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch tip");
        return res.json();
      })
      .then(data => {
        setTip(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading_spinner />;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!tip) return <p className="text-center mt-4">No tip found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{tip.title}</h2>
      <img src={tip.image} alt={tip.title} className="w-full max-h-96 object-cover mb-4 rounded" />
      <p><strong>Category:</strong> {tip.category}</p>
      <p><strong>Difficulty:</strong> {tip.difficulty}</p>
      <p className="mt-4">{tip.description}</p>
    </div>
  );
};

export default IteDetails;
