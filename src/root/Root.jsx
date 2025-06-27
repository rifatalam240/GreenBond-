// import { Outlet, useNavigation } from "react-router";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Loading_spinner from "../components/Loading_spinner";
// import TipsProvider from "../context/TipsContext";
// import AuthProvider from "../context/Authcontext";

// const Root = () => {
//   const data = useNavigation();
//   return (
//     <div className="px-4 md:px-10 lg:px-20 mx-auto space-y-4">
//       <AuthProvider>
//         <TipsProvider>
//           <div>
//             <Navbar />
// <div className="mt-24">
//             {data.state === "loading" ? <Loading_spinner /> : <Outlet />}</div>
      
//           </div>  
//               <Footer />
//         </TipsProvider>
//       </AuthProvider>
//     </div>
//   );
// };

// export default Root;

import { Outlet, useNavigation } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading_spinner from "../components/Loading_spinner";
import TipsProvider from "../context/TipsContext";
import AuthProvider from "../context/Authcontext";

const Root = () => {
  const data = useNavigation();
  return (
    <AuthProvider>
      <TipsProvider>
        {/* Fixed/Navbar */}
        <Navbar />

        {/* Container only for Outlet content */}
        <div className="px-4 md:px-10 lg:px-20 mx-auto mt-24 space-y-4">
          {data.state === "loading" ? <Loading_spinner /> : <Outlet />}
        </div>

        {/* Footer kept completely outside of container */}
        <Footer />
      </TipsProvider>
    </AuthProvider>
  );
};

export default Root;

