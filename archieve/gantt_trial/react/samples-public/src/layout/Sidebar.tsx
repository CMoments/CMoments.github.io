import { NavLink, useLocation } from 'react-router-dom';
import { examples } from './sampleList';


export default function Sidebar() {
  const location = useLocation();
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">React Gantt Samples</h2>
      <ul className="navmenu-ul">
        {examples.map((example) => {
          const isRoot = location.pathname === '/' && example.path === 'basic-init';
          const isExactMatch = location.pathname === `/${example.path}`;
          const isActive = isRoot || isExactMatch;

          return (
            <li className="navmenu-li" key={example.path}>
              <NavLink
                to={`/${example.path}`}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                {example.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
