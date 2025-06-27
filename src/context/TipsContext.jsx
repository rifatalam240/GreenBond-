// import React, { createContext, useContext, useEffect, useState } from "react";

// export const TipsContext = createContext();

// const TipsProvider = ({ children }) => {
//   const [tips, setTips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

//   useEffect(() => {
//     fetch(`${Api}browsetips`)
//       .then((res) => res.json())
//       .then((data) => {
//         setTips(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error loading tips:", error);
//       });
//   }, []);

//   return (
//     <TipsContext.Provider value={{ tips, loading }}>
//       {children}
//     </TipsContext.Provider>
//   );
// };

// export default TipsProvider;

// export const useTips = () => useContext(TipsContext);
import React, { createContext, useContext, useEffect, useState } from "react";

export const TipsContext = createContext();

const TipsProvider = ({ children }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const Api= import.meta.env.VITE_BASE_API || "https://garden-server-eight.vercel.app/";

  useEffect(() => {
    fetch(`${Api}tips`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading tips:", error);
      });
  }, []);

  return (
    <TipsContext.Provider value={{ tips, loading }}>
      {children}
    </TipsContext.Provider>
  );
};

export default TipsProvider;

export const useTips = () => useContext(TipsContext);
