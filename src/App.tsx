import React, {useState, useEffect} from 'react';
import './App.css';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {Header} from "./components/Header";
import {ActivityItem, PagesLink, savedConstName} from "./common/models";
import StartPage from "./components/StartPage";
import {Charts} from "./components/Charts";

import {compose, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import {Provider, useDispatch, useSelector} from 'react-redux'
import KeepMountedModal from "./components/modal";
import {changeTimer, setDataFromLS} from "./redux/actions";
import AlertDialog from "./components/Alert";
//@ts-ignore
const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

function App() {
  return (
      <Provider store={store} >
          <Router>
              <Header />
              <main className='container'>
                  <Routes>
                      <Route path={PagesLink.main} element={<StartPage />} />
                      <Route path={PagesLink.charts} element={<Charts />} />
                  </Routes>
                   <KeepMountedModal />
                  <AlertDialog />
              </main>
          </Router>
      </Provider>
  );
}

export default App;
