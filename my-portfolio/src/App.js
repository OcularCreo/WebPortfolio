import logo from './logo.svg';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;