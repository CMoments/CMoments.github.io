import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

import { examples } from './sampleList';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {

	const [active, setActive] = useState(false);
	useEffect(() => {
		setActive(true);
	});

  return (
    <div className="mobile-menu-backdrop" onClick={onClose}>
      <div
        className={"mobile-menu-panel " + (active ? 'mobile-menu-panel-active' : '')}
        onClick={(e) => e.stopPropagation()}
      >
		<div className="mobile-button-wrapper">
			<button
			className="close-button"
			onClick={() => {setActive(false); onClose();}}
			aria-label="Close menu"
			>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="assets/close">
							<path id="Vector" d="M5 6.41L6.41 5L12 10.59L17.59 5L19 6.41L13.41 12L19 17.59L17.59 19L12 13.41L6.41 19L5 17.59L10.59 12L5 6.41Z" fill="#606770"></path>
							</g>
						</svg>
			</button>
		</div>
		<h2 className="sidebar-title">React Gantt Samples</h2>
        <ul className='navmenu-ul'>
          {examples.map((example) => (
            <li className='navmenu-li' key={example.path}>
              <NavLink
                to={`/${example.path}`}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                {example.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
