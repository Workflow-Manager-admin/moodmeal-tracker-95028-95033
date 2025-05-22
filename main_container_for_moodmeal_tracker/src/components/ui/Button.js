import React from 'react';
import colors from '../../theme/colors';

/**
 * Button component for consistent button styling throughout the application
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, outline)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {function} props.onClick - Click handler function
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  // Style object based on variants
  const getStyles = () => {
    const baseStyle = {
      borderRadius: '4px',
      fontWeight: '500',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
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
      }
    };

    // Color variations
    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        color: colors.textPrimary,
        '&:hover': {
          backgroundColor: colors.primaryDark,
        }
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `1px solid ${colors.primary}`,
        '&:hover': {
          backgroundColor: 'rgba(232, 122, 65, 0.1)',
        }
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
        '&:hover': {
          borderColor: colors.textSecondary,
        }
      }
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant]
    };
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const buttonStyle = getStyles();

  return (
    <button
      style={buttonStyle}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
