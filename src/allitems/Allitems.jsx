import { useEffect, useState } from "react";
import Allitemcard from "./Allitemcard";

const API = import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

const AllItems = () => {
  const [tips, setTips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("All");
  const [sort, setSort] = useState("");
  const [filteredTips, setFilteredTips] = useState([]);
// const [tips, setTips] = useState([]);
  // const [loading, setLoading] = useState(true);
  const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

  useEffect(() => {
    fetch(`${Api}tips`)
      .then((res) => res.json())
      .then((data) => {
        // setTips(data);
        // setLoading(false);
        console.log("Tips loaded:", data);
        // const cpg = data.map((tip) => ({category: tip.category}));setCategories(cpg);
        const cats = [...new Set(data.map(tip => tip.category).filter(Boolean))];
setCategories(cats);  
      }) 
      .catch((error) => {
        console.error("Error loading tips:", error);
      });
  }, []);
  // useEffect(() => {
  //   fetch(`${API}tips/categories`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       let cats = [];
  //       if (Array.isArray(data)) {
  //         cats = data;
  //       } else if (data && Array.isArray(data.categories)) {
  //         cats = data.categories;
  //       }
  //       cats = [...new Set(cats.filter(Boolean))];
  //       setCategories(cats);
  //     })
  //     .catch(() => setCategories([]));
  // }, []);

  // টিপস লোড
  useEffect(() => {
    fetch(`${API}tips`)
      .then((r) => r.json())
      .then(setTips)
      .catch(() => setTips([]));
  }, []);

  // Filtering & Sorting
  useEffect(() => {
    let data = [...tips];
    if (selected !== "All") {
      data = data.filter((tip) => tip.category === selected);
    }
    if (sort === "asc") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "desc") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "likesDesc") {
      data.sort((a, b) => (b.totallikes || 0) - (a.totallikes || 0));
    } else if (sort === "likesAsc") {
      data.sort((a, b) => (a.totallikes || 0) - (b.totallikes || 0));
    }
    setFilteredTips(data);
  }, [tips, selected, sort]);

  return (
    <main className="max-w-7xl mx-auto px-2 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">All Gardening Tips</h1>

      {/* ফিল্টার / সোর্ট */}
      <div className="flex flex-wrap gap-2 justify-between mb-6">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="select select-bordered select-xs md:select-sm"
        >
          <option value="All">All Categories</option>
          {categories.map((c,id) => (
            <option key={id} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered select-xs md:select-sm"
        >
          <option value="">Sort By</option>
          <option value="asc">Title (A-Z)</option>
          <option value="desc">Title (Z-A)</option>
          <option value="likesDesc">Most Liked</option>
          <option value="likesAsc">Least Liked</option>
        </select>
      </div>

      {/* কার্ড গ্রিড */}
      {filteredTips.length === 0 ? (
        <p className="text-center text-gray-500">No items found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredTips.map((tip) => (
            <Allitemcard key={tip._id} tip={tip} />
          ))}
        </div>
      )}
    </main>
  );
};

export default AllItems;