import React, {useState, useEffect} from 'react';
import './App.css';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {Header} from "./components/Header";
import {ActivityItem, PagesLink} from "./common/models";
import StartPage from "./components/StartPage";
import {Charts} from "./components/Charts";

import {compose, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import {Provider} from 'react-redux'
//@ts-ignore
const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


function App() {
    const [data, setData] = useState<ActivityItem[]>([]);

    useEffect(() => {
        const dataFromLS = localStorage.getItem('app_data');
        let data = [];
        if (dataFromLS) data = JSON.parse(dataFromLS);
        localStorage.setItem('app_data',JSON.stringify(data));
        setData(data);
    } ,[])

  return (
      <Provider store={store} >
          <Router>
              <Header />
              <main className='container'>
                  <Routes>
                      <Route path={PagesLink.main} element={<StartPage data={data} setData={setData}/>} />
                      <Route path={PagesLink.charts} element={<Charts data={data}/>} />
                  </Routes>
              </main>
          </Router>
      </Provider>
  );
}

export default App;
