import logo from './logo.svg';
import { NavBar } from './components/NavBar';
import { NavBar2 } from './components/NavBar2';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar2 />
      <Home />
    </div>
  );
}

export default App;