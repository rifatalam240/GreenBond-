import React, { useState } from "react";
import { useParams } from "react-router";
import { useTips } from "../context/TipsContext";
import { FaHeart } from "react-icons/fa";
import Loading_spinner from "../components/Loading_spinner";
import { useAuth } from "../context/Authcontext";

const Tip = () => {
  const { id } = useParams();
  const { tips, loading } = useTips();
  const tip = tips.find((t) => String(t.id) === String(id));
  const [liked, setLiked] = useState(
    tip?.isliked == true || tip?.isliked == "true" ? true : false
  );
  const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

  const { user } = useAuth();

  const handlelike = () => {
    setLiked((prev) => !prev);

    fetch(
      `${Api}tips/updatelikes/${tip._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      }
    );
  };

  if (loading) return <Loading_spinner />;

  console.log({ tip });

  if (!tip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Tip Not Found</h2>
        <p className="text-base-content/70">
          Sorry, we couldn't find this tip.
        </p>
      </div>
    );
  }
  console.log({ liked, isliked: tip?.isliked });
  return (
    <div className="max-w-2xl mx-auto my-10 p-4">
      <div className="card bg-base-100 shadow-xl border border-green-100">
        <figure>
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-64 object-cover rounded-t"
          />
        </figure>
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <h2 className="card-title text-green-700 text-2xl">{tip.title}</h2>
            {/* <button
              className={`btn btn-sm ${
                liked ? "btn-error" : "btn-outline"
              } flex items-center gap-2`}
              onClick={handlelike}
              aria-label="Like"
            >
              <FaHeart className={liked ? "text-red-500" : ""} />
              {tip.totallikes} {liked ? "Liked" : "Like"}
            </button> */}
            <button
              className={`btn btn-sm flex items-center gap-2 ${
                (tip?.isliked == true || tip?.isliked == "true") &&
                (liked == true || liked == "true")
                  ? "btn-error text-white"
                  : "btn-outline"
              }`}
              onClick={handlelike}
            >
              <FaHeart
                className={
                  tip?.isliked && liked ? "text-white" : "text-red-400"
                }
              />
              {tip.totallikes} {tip?.isliked && liked ? "Liked" : "Like"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="badge badge-info">{tip.category}</span>
            <span className="badge badge-outline">{tip.plantType}</span>
            <span className="badge badge-success">{tip.difficulty}</span>
            <span className="badge badge-secondary">{tip.availability}</span>
          </div>
          <p className="mb-4 text-base-content/80">{tip.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <div className="avatar">
              <div className="w-10 rounded-full bg-green-200 flex items-center justify-center">
                <span className="text-lg font-bold text-green-800">
                  {tip.user?.name?.[0]}
                </span>
              </div>
            </div>
            <div>
              <div className="font-semibold text-green-700">
                {tip.user?.name}
              </div>
              <div className="text-xs text-base-content/60">
                {tip.user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tip;
