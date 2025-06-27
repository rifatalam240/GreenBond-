import React, { useEffect, useState } from "react";

const Featuredgardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";
  useEffect(() => {
    fetch(`${Api}gardeners/active`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setGardeners(data);
      })
      .catch((err) => console.error("Failed to load active gardeners:", err));
  }, []);

  console.log("garden", gardeners);

  return (
    <div className="my-10">
      <h2 className="lg:text-3xl text-2xl text-green-800 font-bold text-left mb-8">
        🌟 Featured <span className="text-red-800">Gardeners</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id}
            className="card shadow-xl border bg-red-50 border-green-100"
          >
            <div className="flex items-center text-center justify-between lg:p-10 p-5">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={gardener.image}
                  alt={gardener.name}
                  className="rounded-full h-16 w-16 object-cover border-4 border-green-200"
                />
              </div>
              <div>
                <h3 className="card-title text-green-700">{gardener.name}</h3>
                <p className="text-base-content/70">{gardener.speciality}</p>
                <div className="badge badge-success mt-2">Active</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredgardeners;
