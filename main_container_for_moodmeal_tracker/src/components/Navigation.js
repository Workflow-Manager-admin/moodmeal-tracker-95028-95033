import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import colors from '../theme/colors';

/**
 * Navigation component for the application
 */
const Navigation = () => {
  const location = useLocation();
  
  const navStyle = {
    backgroundColor: colors.background,
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.border}`,
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 100,
  };

  const logoStyle = {
    fontSize: '1.25rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: colors.textPrimary,
    textDecoration: 'none',
  };

  const logoSymbolStyle = {
    color: colors.primary,
  };

  const navLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  };

  const linkStyle = (isActive) => ({
    color: isActive ? colors.primary : colors.textSecondary,
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '400',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <Link to="/" style={logoStyle}>
          <span style={logoSymbolStyle}>🍽️</span> MoodMeal Tracker
        </Link>
      </div>
      
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle(isActive('/'))}>
          Dashboard
        </Link>
        <Link to="/meals" style={linkStyle(isActive('/meals'))}>
          Meals
        </Link>
        <Link to="/moods" style={linkStyle(isActive('/moods'))}>
          Moods
        </Link>
        <Link to="/insights" style={linkStyle(isActive('/insights'))}>
          Insights
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
