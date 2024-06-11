import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GoBoard from './components/GoBoard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import GamePage from './pages/LocalGame';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import LocalGamePage from './pages/LocalGame';
import MultiGamePage from './pages/MultiGame';
import RulesPage from './pages/Rules';
import Sidebar from './components/Sidebar';
import RoomList from './pages/RoomList';
import { sidebarItems } from './components/Sidebar/sidebarItems';
import { menuItems } from './pages/Menu/menuItems';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex h-full">
          <Sidebar sidebarItems={sidebarItems}/>
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/local" element={<LocalGamePage />} />
              <Route path="/multi" element={<MultiGamePage />} />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/" element={<Menu menuItems={menuItems} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
