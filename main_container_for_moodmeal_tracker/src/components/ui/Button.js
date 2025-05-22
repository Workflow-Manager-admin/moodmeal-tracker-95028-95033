import React from 'react';
import colors from '../../theme/colors';

/**
 * Button component for consistent button styling throughout the application
 * with futuristic UI elements and effects
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, outline, glass)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {string} [props.animation] - Optional animation effect (pulse, glow)
 * @param {function} props.onClick - Click handler function
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  animation,
  onClick,
  ...props 
}) => {
  // Style object based on variants
  const getStyles = () => {
    const baseStyle = {
      borderRadius: '8px', // More rounded corners for modern look
      fontWeight: '500',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-medium) ease',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
      position: 'relative',
      overflow: 'hidden', // For gradient effects that might overflow
    };

    // Size variations
    const sizeStyles = {
      small: {
        padding: '8px 16px',
        fontSize: '0.875rem',
      },
      medium: {
        padding: '10px 20px',
        fontSize: '1rem',
      },
      large: {
        padding: '12px 24px',
        fontSize: '1.1rem',
        letterSpacing: '0.5px', // Better readability for larger buttons
      }
    };

    // Color and effect variations
    const variantStyles = {
      primary: {
        background: colors.primaryGradient,
        color: colors.textPrimary,
        boxShadow: colors.shadowLight,
        ':hover': {
          boxShadow: colors.shadowMedium,
          transform: 'translateY(-1px)',
        },
        ':active': {
          transform: 'translateY(1px)',
        }
      },
      secondary: {
        background: 'transparent',
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
        boxShadow: `0 0 0 1px rgba(232, 122, 65, 0.1)`,
        ':hover': {
          boxShadow: `0 0 0 2px rgba(232, 122, 65, 0.2), ${colors.shadowLight}`,
          background: 'rgba(232, 122, 65, 0.05)',
        }
      },
      outline: {
        background: 'transparent',
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        ':hover': {
          borderColor: colors.borderGlow,
          boxShadow: colors.shadowLight,
        }
      },
      glass: {
        background: colors.glassBackground,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${colors.glassBorder}`,
        color: colors.textPrimary,
        boxShadow: colors.shadowLight,
        ':hover': {
          boxShadow: colors.shadowMedium,
          background: 'rgba(255, 255, 255, 0.08)',
        }
      },
      accent: {
        background: colors.accentGradient,
        color: colors.textPrimary,
        boxShadow: `0 4px 12px rgba(0, 210, 255, 0.3)`,
        ':hover': {
          boxShadow: `0 6px 16px rgba(0, 210, 255, 0.4)`,
          transform: 'translateY(-1px)',
        }
      }
    };

    // Animation styles
    let animationStyle = {};
    if (animation) {
      switch (animation) {
        case 'pulse':
          animationStyle = {
            animation: 'pulse 2s infinite',
          };
          break;
        case 'glow':
          animationStyle = {
            animation: 'glow 2s infinite',
          };
          break;
        default:
          break;
      }
    }

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...animationStyle
    };
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  // Apply hover and active state styling
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  
  const buttonStyle = {
    ...getStyles(),
    ...(isHovered && getStyles()[':hover']),
    ...(isActive && getStyles()[':active']),
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      className={animation ? animation : ''}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
