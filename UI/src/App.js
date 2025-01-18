import './App.css';
// import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";


import Toolbar from './components/public/header/toolbar/toolbar';
// # PAGES
import Home from './pages/home';
import AddTodo from './pages/add-todo';
// const EditPage = lazy(()=> import('./pages/edit-todo'))
import EditPage from './pages/edit-todo';



function App() {

  return (
    <Router>
      <div className="App">

        <Toolbar/>
        <Routes>
          <Route exact index Component={Home}/>
          <Route exact path='/add-todo' Component={AddTodo}/>
          <Route exact path='/edit-todo/:id' Component={EditPage}/>
          {/* <Route exact path='/edit-todo/:id' element={
            <Suspense fallback={<h1>...loading</h1>}>
              <EditPage/>
            </Suspense>
          }/> */}
          <Route path='*' element={<h1>NOT 404 FOUND</h1>}/>
        </Routes>
        
      </div>
    </Router>
    
  )
}

export default App;
