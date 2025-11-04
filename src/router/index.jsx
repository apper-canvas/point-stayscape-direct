import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { getRouteConfig } from "./route.utils";

// Lazy load components
const Root = lazy(() => import("@/layouts/Root"));
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const HotelsPage = lazy(() => import("@/components/pages/HotelsPage"));
const HotelDetailsPage = lazy(() => import("@/components/pages/HotelDetailsPage"));
const BookingPage = lazy(() => import("@/components/pages/BookingPage"));
const BookingsPage = lazy(() => import("@/components/pages/BookingsPage"));
const DashboardPage = lazy(() => import("@/components/pages/DashboardPage"));
const ProfilePage = lazy(() => import("@/components/pages/ProfilePage"));
const AboutPage = lazy(() => import("@/components/pages/AboutPage"));
const ReviewsPage = lazy(() => import("@/components/pages/ReviewsPage"));
const Login = lazy(() => import("@/components/pages/Login"));
const Signup = lazy(() => import("@/components/pages/Signup"));
const Callback = lazy(() => import("@/components/pages/Callback"));
const ErrorPage = lazy(() => import("@/components/pages/ErrorPage"));
const ResetPassword = lazy(() => import("@/components/pages/ResetPassword"));
const PromptPassword = lazy(() => import("@/components/pages/PromptPassword"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

// Main layout with header, footer, and toast container
const MainLayout = lazy(() => import("@/layouts/MainLayout"));

const createRoute = ({
  path,
  index,
  element,
  access,
  children,
  ...meta
}) => {
  // Get config for this route
  let configPath;
  if (index) {
    configPath = "/";
  } else {
    configPath = path.startsWith('/') ? path : `/${path}`;
  }

  const config = getRouteConfig(configPath);
  const finalAccess = access || config?.allow;

  const route = {
    ...(index ? { index: true } : { path }),
    element: element ? <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>}>{element}</Suspense> : element,
    handle: {
      access: finalAccess,
      ...meta,
    },
  };

  if (children && children.length > 0) {
    route.children = children;
  }

  return route;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Auth routes (no layout)
      createRoute({
        path: "login",
        element: <Login />
      }),
      createRoute({
        path: "signup", 
        element: <Signup />
      }),
      createRoute({
        path: "callback",
        element: <Callback />
      }),
      createRoute({
        path: "error",
        element: <ErrorPage />
      }),
      createRoute({
        path: "prompt-password/:appId/:emailAddress/:provider",
        element: <PromptPassword />
      }),
      createRoute({
        path: "reset-password/:appId/:fields",
        element: <ResetPassword />
      }),
      
      // Main app routes (with layout)
      {
        path: "/",
        element: <MainLayout />,
        children: [
          createRoute({
            index: true,
            element: <HomePage />
          }),
          createRoute({
            path: "hotels",
            element: <HotelsPage />
          }),
          createRoute({
            path: "hotels/:id",
            element: <HotelDetailsPage />
          }),
          createRoute({
            path: "booking",
            element: <BookingPage />
          }),
          createRoute({
            path: "bookings",
            element: <BookingsPage />
          }),
          createRoute({
            path: "dashboard",
            element: <DashboardPage />
          }),
          createRoute({
            path: "profile", 
            element: <ProfilePage />
          }),
          createRoute({
            path: "reviews",
            element: <ReviewsPage />
          }),
          createRoute({
            path: "about",
            element: <AboutPage />
          }),
        ]
      },
      
      // 404 fallback
      createRoute({
        path: "*",
        element: <NotFound />
      })
    ]
  }
]);