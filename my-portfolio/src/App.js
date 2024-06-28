import logo from './logo.svg';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { GameDev } from './pages/GameDev';
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
        element: <GameDev/>
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