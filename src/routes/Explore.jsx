import React, { useEffect, useState } from "react";
import Loading_spinner from "../components/Loading_spinner";

const Explore = () => {
  const [gardeners, setGardeners] = useState([]);
  const Api = import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";
  // useEffect(() => {  

  useEffect(() => {
    fetch(`${Api}gardeners/explore`)
      .then((res) => res.json())
      .then((data) => setGardeners(data));
  }, []);
  console.log("explore ", gardeners);

  if (gardeners.length === 0) {
    return <Loading_spinner />;
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-6 text-left text-green-800">
        🌿 Explore Gardeners
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gardeners.map((g) => (
          <div
            key={g.id || g._id}
            className="card card-compact bg-green-50 shadow-lg border border-green-100 rounded-xl flex flex-col transition hover:shadow-xl"
          >
            <div className="flex items-center gap-4 p-4">
              <img
                src={g.image}
                alt={g.name}
                className="rounded-full h-16 w-16 object-cover border-2 border-green-200"
              />
              <div className="flex-1">
                <h3 className="font-bold text-green-700 text-lg">{g.name}</h3>
                <div className="text-xs text-blue-600 mb-1">{g.speciality}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-red-500">
                  <span className="badge badge-outline">Age: {g.age}</span>
                  <span className="badge badge-outline">
                    Gender: {g.gender}
                  </span>
                  <span className="badge btn btn-primary badge-success">
                    {g.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 text-xs   text-red-500">
              <div>
                <span className="font-semibold text-green-700">
                  Experience:
                </span>{" "}
                {g.experiences}
              </div>
              <div>
                <span className="font-semibold text-green-700">
                  Total Tips:
                </span>{" "}
                {g.totalSharedTips}
              </div>
              {g.location && (
                <div>
                  <span className="font-semibold text-green-700">
                    Location:
                  </span>{" "}
                  {g.location}
                </div>
              )}
              {g.email && (
                <div>
                  <span className="font-semibold text-green-700">Email:</span>{" "}
                  {g.email}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
