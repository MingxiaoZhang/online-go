// src/components/Menu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface MenuProps {
  menuItems: {
    option: string,
    link: string
  }[]
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 h-full">
        {menuItems.map(item => 
          <Link to={item.link} className="select">
            <button className="select-button">
              {item.option}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
