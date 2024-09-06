import logo from './logo.svg';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectPage } from './components/ProjectPage';
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

import {ScrollToTop} from "./helpers/ScrollToTop";

const MainLayout = () => (
  <>
    <ScrollToTop />
    <NavBar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />, 
    children: [
      {
        path: '/', 
        element: <Home/>,
        errorElement: <NotFoundPage/>
      }, 
      {
        path: '/gamedev', 
        element: <ProjectGrid category={"Game Development"} icon={<FontAwesomeIcon icon="fa-solid fa-gamepad" />} />
      }, 
      {
        path: '/gamedev/proj/:id', 
        element: <ProjectPage />
      }, 
      {
        path: '/photography', 
        element: <ProjectGrid category={"Photography"} icon={<FontAwesomeIcon icon="fa-solid fa-camera" />} />
      }, 
      {
        path: '/photography/proj/:id', 
        element: <ProjectPage />
      }, 
      {
        path: '/webdev', 
        element: <ProjectGrid category={"Web Development"} icon={<FontAwesomeIcon icon="fa-solid fa-code"/>} />
      }, 
      {
        path: '/webdev/proj/:id', 
        element: <ProjectPage />
      }, 
      {
        path: '/2d', 
        element: <ProjectGrid category={"2D"} icon={<FontAwesomeIcon icon="fa-solid fa-square"/>} />
      }, 
      {
        path: '/2d/proj/:id', 
        element: <ProjectPage />
      }, 
      {
        path: '/3d', 
        element: <ProjectGrid category={"3D"} icon={<FontAwesomeIcon icon="fa-solid fa-cube" />} />
      }, 
      {
        path: '/3d/proj/:id', 
        element: <ProjectPage />
      }, 
      {
        path: '/extras', 
        element: <ProjectGrid category={"Extras"} icon={<FontAwesomeIcon icon="fa-solid fa-circle-plus" />} />
      }, 
      {
        path: '/extras/proj/:id', 
        element: <ProjectPage />
      }
    ]
  }
  
]);

function App() {
  return (
    <RouterProvider router={router} /> 
  );
}

export default App;