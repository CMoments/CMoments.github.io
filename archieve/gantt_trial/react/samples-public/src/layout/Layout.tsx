import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      <Header onBurgerClick={handleBurgerClick} />

      <div className="layout-body">
        <Sidebar /> {/* Hidden on mobile via CSS */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {mobileMenuOpen && (
        <MobileMenu onClose={handleMenuClose} />
      )}
    </div>
  );
}
