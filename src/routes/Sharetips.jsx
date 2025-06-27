// import React, { useState } from "react";
// import { toast } from "react-toastify";

// // Dummy user info (replace with real user context/auth)
// const user = {
//   name: "Demo User",
//   email: "demo.user@example.com",
// };

// const initialState = {
//   title: "",
//   plantType: "",
//   difficulty: "Easy",
//   description: "",
//   image: "",
//   category: "Plant Care",
//   availability: "Public",
// };

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

// const Sharetips = () => {
//   const [form, setForm] = useState(initialState);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const tipData = {
//       ...form,
//       totallikes: 0,
//       isliked: false,
//       id: crypto.randomUUID(),
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     };
//     fetch("https://garden-server-eight.vercel.app/tips", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(tipData),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setLoading(false);
//         if (result.insertedId || result.acknowledged) {
//           toast.success("Tip shared successfully!");
//           setForm(initialState);
//         } else {
//           toast.error("Something went wrong.");
//         }
//       })
//       .catch((err) => {
//         setLoading(false);
//         toast.error("Failed to share tip.");
//         console.error(err);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center my-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         ➕ Share a Garden Tip
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md flex flex-col gap-3 items-center"
//       >
//         <input
//           type="text"
//           className="input input-bordered w-full"
//           placeholder="Title (e.g., How I Grow Tomatoes Indoors)"
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
//           <option>Private</option>
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

//         <button
//           type="submit"
//           className="btn btn-success w-full mt-2"
//           disabled={loading}
//         >
//           {loading ? "Sharing..." : "Share Tip"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Sharetips;
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";

const initialState = {
  title: "",
  plantType: "",
  difficulty: "Easy",
  description: "",
  image: "",
  category: "Plant Care",
  availability: "Public",
};

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

const ShareTips = () => {
  const {user}=useAuth() // 🔑 logged-in user context
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first to share a tip.");
      return;
    }

    setLoading(true);

    const tipData = {
      ...form,
      totallikes: 0,
      isliked: false,
      id: crypto.randomUUID(),
      user: {
        name: user.displayName || user.name || "Anonymous",
        email: user.email,
      },
    };

    try {
      const res = await fetch(`${Api}tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tipData),
      });

      const result = await res.json();

      if (result.insertedId || result.acknowledged) {
        toast.success("Tip shared successfully!");
        setForm(initialState);
      } else {
        toast.error("Something went wrong while sharing.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to share tip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">➕ Share a Garden Tip</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3 items-center">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Title (e.g., How I Grow Tomatoes Indoors)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Plant Type / Topic"
          value={form.plantType}
          onChange={(e) => setForm({ ...form, plantType: e.target.value })}
          required
        />

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

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="url"
          className="input input-bordered w-full"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />

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

        <select
          className="select select-bordered w-full"
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
          required
        >
          <option>Public</option>
          <option>Private</option>
        </select>

        <input
          type="text"
          className="input input-bordered w-full"
          value={user?.displayName || user?.name || "Anonymous"}
          readOnly
          disabled
        />
        <input
          type="email"
          className="input input-bordered w-full"
          value={user?.email || ""}
          readOnly
          disabled
        />

        <button
          type="submit"
          className="btn btn-success w-full mt-2"
          disabled={loading}
        >
          {loading ? "Sharing..." : "Share Tip"}
        </button>
      </form>
    </div>
  );
};

export default ShareTips;
