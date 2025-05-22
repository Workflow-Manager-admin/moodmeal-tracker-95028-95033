import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import colors from '../theme/colors';

/**
 * Navigation component for the application with futuristic glass design
 */
const Navigation = () => {
  const location = useLocation();
  
  const navStyle = {
    backgroundColor: 'rgba(18, 18, 18, 0.8)', // Semi-transparent background
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.glassBorder}`,
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: colors.textPrimary,
    textDecoration: 'none',
    letterSpacing: '-0.5px',
  };

  const logoSymbolStyle = {
    background: colors.primaryGradient,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontSize: '1.8rem',
    filter: 'drop-shadow(0 0 8px rgba(232, 122, 65, 0.6))',
    animation: 'pulse 2s infinite',
  };

  const logoTextStyle = {
    background: colors.primaryGradient,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const navLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '22px',
  };

  const linkStyle = (isActive) => ({
    color: isActive ? colors.textPrimary : colors.textSecondary,
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    textShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.4)' : 'none',
    letterSpacing: '0.5px',
  });

  // Glowing underline effect styles
  const linkUnderlineStyle = (isActive) => ({
    content: '""',
    position: 'absolute',
    bottom: '2px',
    left: '12px',
    right: '12px',
    height: '2px',
    background: isActive ? colors.primaryGradient : 'transparent',
    borderRadius: '1px',
    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease',
    filter: isActive ? 'blur(1px)' : 'none',
    boxShadow: isActive ? '0 0 8px rgba(232, 122, 65, 0.8)' : 'none',
  });

  const linkHoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-2px)',
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Menu item icon styles 
  const iconStyle = {
    marginRight: '6px',
    fontSize: '1.1rem',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={logoStyle}>
          <span style={logoSymbolStyle}>🍽️</span> 
          <span style={logoTextStyle}>MoodMeal Tracker</span>
        </Link>
      </div>
      
      <div style={navLinksStyle}>
        <NavLink to="/" active={isActive('/')} icon="📊">
          Dashboard
        </NavLink>
        <NavLink to="/meals" active={isActive('/meals')} icon="🍲">
          Meals
        </NavLink>
        <NavLink to="/moods" active={isActive('/moods')} icon="😊">
          Moods
        </NavLink>
        <NavLink to="/insights" active={isActive('/insights')} icon="📈">
          Insights
        </NavLink>
      </div>
    </nav>
  );
};

// NavLink component for consistent styling with hover effects
const NavLink = ({ to, active, icon, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const baseStyle = {
    color: active ? colors.textPrimary : colors.textSecondary,
    textDecoration: 'none',
    fontWeight: active ? '600' : '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    textShadow: active ? '0 0 8px rgba(255, 255, 255, 0.4)' : 'none',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    ...(isHovered && !active ? { 
      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
      transform: 'translateY(-2px)' 
    } : {})
  };

  const underlineStyle = {
    position: 'absolute',
    bottom: '4px',
    left: '10px',
    right: '10px',
    height: '2px',
    background: colors.primaryGradient,
    borderRadius: '1px',
    transform: active || isHovered ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease',
    filter: 'blur(0.5px)',
    boxShadow: active ? '0 0 8px rgba(232, 122, 65, 0.8)' : 'none',
  };

  const iconStyle = {
    marginRight: '6px',
    fontSize: '1.1rem',
  };

  return (
    <Link 
      to={to} 
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={iconStyle}>{icon}</span>
      {children}
      <div style={underlineStyle} />
    </Link>
  );
};

export default Navigation;
