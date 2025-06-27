// // import { lazy, Suspense } from "react";
// // import { createBrowserRouter } from "react-router";
// // import Root from "../root/Root";
// // import Errorpage from "../components/Errorpage";
// // const Home = lazy(() => import("./Home"));
// // const Explore = lazy(() => import("./Explore"));
// // const Tips = lazy(() => import("./Tips"));
// // const Tip = lazy(() => import("./Tip"));
// // const Mytips = lazy(() => import("./Mytips"));
// // const Register = lazy(() => import("./Register"));
// // const Login = lazy(() => import("./Login"));
// // const Sharetips = lazy(() => import("./Sharetips"));
// // const Updatetip = lazy(() => import("./Updatetip"));
// // import Loading_spinner from "../components/Loading_spinner";
// // import Privateroute from "../components/Privateroute";
// // import AllItems from "../allitems/Allitems";

// // const withSuspense = (Component) => () =>
// //   (
// //     <Suspense fallback={<Loading_spinner />}>
// //       <Component />
// //     </Suspense>
// //   );

// // // Wrap private routes with Privateroute
// // const withPrivate = (Component) => () =>
// //   (
// //     <Privateroute>
// //       <Suspense fallback={<Loading_spinner />}>
// //         <Component />
// //       </Suspense>
// //     </Privateroute>
// //   );

// // export const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     Component: Root,
// //     errorElement: <Errorpage />,
// //     children: [
// //       {
// //         index: true,
// //         Component: withSuspense(Home),
// //       },
// //       { path: "/explore", Component: withSuspense(Explore) },
// //       { path: "/tips", Component: withSuspense(Tips) },
// //       { path: "/tips/:id", Component: withSuspense(Tip) },
// //       { path: "/mytips", Component: withPrivate(Mytips) },      
// //       { path: "/signup", Component: withSuspense(Register) },
// //       { path: "/login", Component: withSuspense(Login) },
// //       { path: "/updatetip/:id", Component: withSuspense(Updatetip) },
// //       { path: "/sharetips", Component: withPrivate(Sharetips) },  { path: "/allitems", Component: withPrivate(AllItems) }, 
// //     ],
// //   },
// // ]);

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Errorpage from "../components/Errorpage";
const Home = lazy(() => import("./Home"));
const Explore = lazy(() => import("./Explore"));
const Tips = lazy(() => import("./Tips"));
const Tip = lazy(() => import("./Tip"));
const Mytips = lazy(() => import("./Mytips"));
const Register = lazy(() => import("./Register"));
const Login = lazy(() => import("./Login"));
const Sharetips = lazy(() => import("./Sharetips"));
const Updatetip = lazy(() => import("./Updatetip"));
import Loading_spinner from "../components/Loading_spinner";
import Privateroute from "../components/Privateroute";
import AllItems from "../allitems/Allitems";
import IteDetails from "../allitems/IteDetails";
import Dashboard from "../Dashboard/Dashboar";

// Suspense wrapper
const withSuspense = (Component) => () =>
  (
    <Suspense fallback={<Loading_spinner />}>
      <Component />
    </Suspense>
  );

// Private route wrapper
const withPrivate = (Component) => () =>
  (
    <Privateroute>
      <Suspense fallback={<Loading_spinner />}>
        <Component />
      </Suspense>
    </Privateroute>
  );

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Errorpage />,
    children: [
      { index: true, Component: withSuspense(Home) },
      { path: "/explore", Component: withSuspense(Explore) },
      { path: "/tips", Component: withSuspense(Tips) },
      { path: "/tips/:id", Component: withSuspense(Tip) },
      { path: "/signup", Component: withSuspense(Register) },
      { path: "/login", Component: withSuspense(Login) },
      { path: "/allitems", Component: withSuspense(AllItems) },
      { path: "/item/:id", Component: withSuspense(IteDetails) },
      { path: "/mytips", Component: withPrivate(Mytips) },
      { path: "/sharetips", Component: withPrivate(Sharetips) },
      { path: "/updatetip/:id", Component: withSuspense(Updatetip) },
      // Dashboard private route with nested children
      {
        path: "/dashboard",
        element:
          <Privateroute>
            <Dashboard />
          </Privateroute>,
        children: [
          { index: true, element: <Dashboard /> }, // Overview
          { path: "allitems", element: <AllItems /> },
          { path: "additem", element: <Sharetips /> },
          { path: "mytips", element: <Mytips /> },
        ],
      },
    ],
  },
]);
