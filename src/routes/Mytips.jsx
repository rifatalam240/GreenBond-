import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../context/Authcontext";

const MyTips = () => {
  const { user, loading } = useAuth();
  const [myTips, setMyTips] = useState([]);
  const navigate = useNavigate();
   const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";
  useEffect(() => {
    if (!loading && user?.email) {
      fetch(`${Api}tips/mytips?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyTips(data))
        .catch((err) => console.error("Error loading tips:", err));
    }
  }, [user, loading]);
console.log({myTips,user});
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this tip?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${Api}tips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your tip has been removed.", "success");
              setMyTips((prev) => prev.filter((tip) => tip._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="p-2 md:p-6">
      <h2 className="text-xl md:text-2xl mb-3 font-semibold">📂 My Garden Tips</h2>
      {myTips.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No tips shared yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-green-100">
          <table className="table table-xs md:table-sm w-full">
            <thead className="bg-green-50 text-green-900">
              <tr>
                <th className="px-2 py-2">Title</th>
                <th className="px-2 py-2">Category</th>
                <th className="px-2 py-2">Availability</th>
                <th className="px-2 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTips.map((tip) => (
                <tr key={tip._id} className="">
                  <td className="px-2 py-1">{tip.title}</td>
                  <td className="px-2 py-1">{tip.category}</td>
                  <td className="px-2 py-1">
                    <span className={`badge badge-xs ${tip.availability === "Public" ? "badge-success" : "badge-ghost"}`}>
                      {tip.availability}
                    </span>
                  </td>
                  <td className="px-2 py-1 flex gap-1 justify-center">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      title="Update"
                      onClick={() => navigate(`/updatetip/${tip._id}`)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      title="Delete"
                      onClick={() => handleDelete(tip._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTips;
