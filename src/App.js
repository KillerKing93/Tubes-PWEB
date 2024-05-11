import logo from './logo.svg';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import MainLayout from './layout/MainLayout';
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import Order from './Pages/Order';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Register from './Pages/RegistrationPage';
import Login from './Pages/LoginPage';
import BookedHotels from './Pages/BookedHotels';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout css="myBG">
          <LandingPage />
        </MainLayout>
      ),
    },
    {
      path: "/about",
      element: (
        <MainLayout css="myBG">
          <About />
        </MainLayout>
      ),
    },
    {
      path: "/order",
      element: (
        <MainLayout css="myBG">
          <Order />
        </MainLayout>
      ),
    },
    {
      path: "/services",
      element: (
        <MainLayout css="myBG">
          <Services />
        </MainLayout>
      ),
    },
    {
      path: "/contact",
      element: (
        <MainLayout css="myBG">
          <Contact />
        </MainLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <MainLayout css="myBG">
          <Register />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <MainLayout css="myBG">
          <Login />
        </MainLayout>
      ),
    },
    {
      path: "/bookings",
      element: (
        <MainLayout css="myBG">
          <BookedHotels />
        </MainLayout>
      ),
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
