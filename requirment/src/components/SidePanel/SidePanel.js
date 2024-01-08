// SidePanel.jsx
import React from 'react';
import './SidePanel.css'
const SidePanel = ({ onMenuClick }) => {
    return (
      <aside className="side-panel">
        <nav>
          <ul>
            <li onClick={() => onMenuClick('menu-item-1')}>Apply Application Part I</li>
            <li onClick={() => onMenuClick('menu-item-2')}>Apply Application Part II</li>
            <li onClick={() => onMenuClick('menu-item-3')}>Print Application</li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
      </aside>
    );
  };
  
  export default SidePanel;

