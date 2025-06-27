import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { useTips } from "../context/TipsContext";
import Loading_spinner from "../components/Loading_spinner";

const Tips = () => {
  const navigate = useNavigate();
  const { tips, loading } = useTips();
  const [difficulty, setDifficulty] = useState("All");

  if (loading) {
    return <Loading_spinner />;
  }

  // Filter only public tips
  let publicTips = tips?.filter((tip) => tip.availability === "Public") || [];

  if (difficulty !== "All") {
    publicTips = publicTips.filter((tip) => tip.difficulty === difficulty);
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🌱 Browse Public Tips
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <label className="font-semibold">Filter by Difficulty:</label>
        <select
          className="select select-bordered max-w-xs"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {publicTips.map((tip, idx) => (
              <tr key={tip.id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td>{tip.title}</td>
                <td>{tip.category}</td>
                <td>
                  <span className="badge badge-success">{tip.difficulty}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => navigate(`/tips/${tip.id}`)}
                    title="See More"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
            {publicTips.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-base-content/70">
                  No public tips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tips;
