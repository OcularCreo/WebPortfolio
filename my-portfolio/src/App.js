import logo from './logo.svg';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectPage } from './components/ProjectPage';
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

const MainLayout = () => (
  <>
    <NavBar />
    <Outlet />
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