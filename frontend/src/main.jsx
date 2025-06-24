import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage } from './pages/EventPage';
import { EventsPage } from './pages/EventsPage';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Root } from './components/Root';
import { LoginPage } from './pages/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";
import SignupForm from './components/SignupForm';
import { useToast } from '@chakra-ui/react';

// Inactivity logout component
function AutoLogout() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let timer;

    const logout = () => {
      localStorage.removeItem("token"); // or your auth key
      toast({
        title: "Logged out",
        description: "You have been logged out due to inactivity. Please log back in.",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [navigate, toast]);

  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AutoLogout />
        <Root />
      </>
    ),
    children: [
      {
        element: <ProtectedRoute />, // Wrap protected routes
        children: [
          { path: '/', element: <EventsPage /> },
          { path: '/events', element: <EventsPage /> },
          { path: '/event/:eventId', element: <EventPage /> },
        ],
      },
      { 
        path: '/login', 
        element: (
          <>
            <LoginPage />
            <SignupForm />
          </>
        ) 
      },
    ],
  },
]);


// /////////////////////////////////////////////////////////////////////////////////////////////
// // Remove auth token on app start (for development only)
// if (window.location.hostname === "localhost") {
//   localStorage.removeItem('token'); // Replace 'token' with your actual key if different
// }
// ////////////////////////////////////////////////////////////////////////////////////////////



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
