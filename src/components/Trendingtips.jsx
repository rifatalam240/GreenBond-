import { useEffect, useState } from "react";
import Loading_spinner from "./Loading_spinner";

const Trendingtips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
const Api= import.meta.env.VITE_BASE_API|| "https://garden-server-eight.vercel.app/";
console.log({Api});
  useEffect(() => {
    fetch(`${Api}tips/trending`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading_spinner />;
  }

  return (
    <div className="my-10">
      <h2 className="lg:text-3xl text-2xl text-red-800 font-bold text-left mb-8">
        🔥 Trending <span className="text-green-800">Tips</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip._id}
            className="card card-compact bg-base-100 shadow border border-green-100"
          >
            <figure>
              <img
                src={tip.image}
                alt={tip.title}
                className="h-40 w-full object-cover rounded-t"
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title text-green-700 text-base mb-1">
                {tip.title}
              </h3>
              <p className="text-xs text-base-content/70 mb-2 line-clamp-2">
                {tip.description}
              </p>
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="badge badge-outline text-green-700 font-semibold">
                  {tip.plantType}
                </span>
                <span className="badge badge-success">{tip.difficulty}</span>
                <span className="badge badge-info">{tip.category}</span>
                <span className="ml-auto text-[11px] text-base-content/60">
                  by {tip.user?.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trendingtips;
