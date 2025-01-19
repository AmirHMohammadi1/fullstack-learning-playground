import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router';
import reportWebVitals from './reportWebVitals';

// # PAGES
import App from './App';
import Home from './pages/home';
import AddTodo from './pages/add-todo';
// import { lazy, Suspense } from 'react';
// const EditPage = lazy(()=> import('./pages/edit-todo'))
import EditPage from './pages/edit-todo';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path='/add-todo' element={<AddTodo/>}/>
        <Route path='/edit-todo/:id' element={<EditPage/>}/>
      </Route>
      {/* <Route exact path='/edit-todo/:id' element={
          <Suspense fallback={<h1>...loading</h1>}>
            <EditPage/>
          </Suspense>
        }/> */}
      <Route path='*' element={<h1>NOT 404 FOUND</h1>}/>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
