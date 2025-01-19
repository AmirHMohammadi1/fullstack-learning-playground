import './App.css';
import Toolbar from './components/public/header/toolbar/toolbar';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">

      <Toolbar/>
      <Outlet />
    </div>
  )
}

export default App;
