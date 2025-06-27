// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router";
// import { toast } from "react-toastify";

// const categories = [
//   "Plant Care",
//   "Composting",
//   "Vertical Gardening",
//   "Hydroponics",
//   "Organic Pest Control",
//   "Balcony Gardening",
//   "Fruit Plants",
//   "Herb Garden",
// ];

// const user = {
//   name: "Demo User",
//   email: "demo.user@example.com",
// };

// const Updatetip = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     plantType: "",
//     difficulty: "Easy",
//     description: "",
//     image: "",
//     category: "Plant Care",
//     availability: "Public",
//   });

//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(false);

//   useEffect(() => {
//     console.log("Fetching tip for id:", id);
//     setLoading(true);
//     fetch(`https://garden-server-eight.vercel.app/tips/${id}`)
//       .then((res) => {
//         console.log("Response status:", res.status);
//         if (!res.ok) {
//           throw new Error("Tip not found");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Data received:", data);
//         if (data) {
//           setForm({
//             title: data.title || "",
//             plantType: data.plantType || "",
//             difficulty: data.difficulty || "Easy",
//             description: data.description || "",
//             image: data.image || "",
//             category: data.category || "Plant Care",
//             availability: data.availability || "Public",
//           });
//         }
//         setFetchError(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setFetchError(true);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div className="text-center mt-10">Loading tip data...</div>;
//   }

//   // Only show error if fetch failed (e.g. network error or 404)
//   if (fetchError) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[40vh]">
//         <h2 className="text-2xl font-bold text-red-500 mb-4">Tip Not Found</h2>
//         <p className="text-base-content/70">
//           Sorry, we couldn't find this tip.
//         </p>
//       </div>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedTip = {
//       ...form,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     };

//     fetch(`https://garden-server-eight.vercel.app/tips/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedTip),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to update tip");
//         }
//         return res.json();
//       })
//       .then(() => {
//         toast.success("Tip updated successfully!");
//         navigate("/mytips");
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Update failed. Please try again.");
//       });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center my-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">✏️ Update Tip</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md flex flex-col gap-3 items-center"
//       >
//         <input
//           type="text"
//           className="input input-bordered w-full"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />

//         <input
//           type="text"
//           className="input input-bordered w-full"
//           placeholder="Plant Type / Topic"
//           value={form.plantType}
//           onChange={(e) => setForm({ ...form, plantType: e.target.value })}
//           required
//         />

//         <select
//           className="select select-bordered w-full"
//           value={form.difficulty}
//           onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
//           required
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>

//         <textarea
//           className="textarea textarea-bordered w-full"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         />

//         <input
//           type="url"
//           className="input input-bordered w-full"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//           required
//         />

//         <select
//           className="select select-bordered w-full"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//           required
//         >
//           {categories.map((cat) => (
//             <option key={cat}>{cat}</option>
//           ))}
//         </select>

//         <select
//           className="select select-bordered w-full"
//           value={form.availability}
//           onChange={(e) => setForm({ ...form, availability: e.target.value })}
//           required
//         >
//           <option>Public</option>
//           <option>Hidden</option>
//         </select>

//         <input
//           type="text"
//           className="input input-bordered w-full"
//           value={user.name}
//           readOnly
//           disabled
//         />
//         <input
//           type="email"
//           className="input input-bordered w-full"
//           value={user.email}
//           readOnly
//           disabled
//         />

//         <button type="submit" className="btn btn-success w-full mt-2">
//           Update Tip
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Updatetip;
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";

const categories = [
  "Plant Care",
  "Composting",
  "Vertical Gardening",
  "Hydroponics",
  "Organic Pest Control",
  "Balcony Gardening",
  "Fruit Plants",
  "Herb Garden",
];

const initialState = {
  title: "",
  plantType: "",
  difficulty: "Easy",
  description: "",
  image: "",
  category: "Plant Care",
  availability: "Public",
};

const Updatetip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth()

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);       // data fetch loading
  const [fetchError, setFetchError] = useState(false);
  const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

  /* ───────────────── Fetch existing tip ───────────────── */
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`${Api}tips/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Tip not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title || "",
          plantType: data.plantType || "",
          difficulty: data.difficulty || "Easy",
          description: data.description || "",
          image: data.image || "",
          category: data.category || "Plant Care",
          availability: data.availability || "Public",
        });
        setFetchError(false);
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, [id]);

  /* ───────────────── Submit handler ───────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please log in first!");

    const updatedTip = {
      ...form,
      user: { name: user.displayName || user.name, email: user.email },
    };

    fetch(`${Api}tips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTip),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update tip");
        return res.json();
      })
      .then(() => {
        toast.success("Tip updated successfully!");
        navigate("/mytips");
      })
      .catch(() => toast.error("Update failed. Please try again."));
  };

  /* ───────────────── UI states ───────────────── */
  if (authLoading || loading)
    return <div className="text-center mt-10">Loading tip data...</div>;

  if (fetchError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Tip Not Found</h2>
        <p className="text-base-content/70">
          Sorry, we couldn't find this tip.
        </p>
      </div>
    );

  /* ───────────────── Form UI ───────────────── */
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">✏️ Update Tip</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-3 items-center"
      >
        {/* title */}
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* plant type */}
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Plant Type / Topic"
          value={form.plantType}
          onChange={(e) => setForm({ ...form, plantType: e.target.value })}
          required
        />

        {/* difficulty */}
        <select
          className="select select-bordered w-full"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          required
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* description */}
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        {/* image URL */}
        <input
          type="url"
          className="input input-bordered w-full"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />

        {/* category */}
        <select
          className="select select-bordered w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* availability */}
        <select
          className="select select-bordered w-full"
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
          required
        >
          <option>Public</option>
          <option>Hidden</option>
        </select>

        {/* read-only user info */}
        <input
          type="text"
          className="input input-bordered w-full"
          value={user.displayName || user.name}
          readOnly
          disabled
        />
        <input
          type="email"
          className="input input-bordered w-full"
          value={user.email}
          readOnly
          disabled
        />

        {/* submit */}
        <button type="submit" className="btn btn-success w-full mt-2">
          Update Tip
        </button>
      </form>
    </div>
  );
};

export default Updatetip;
