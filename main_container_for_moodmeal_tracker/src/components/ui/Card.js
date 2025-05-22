import React from 'react';
import colors from '../../theme/colors';

/**
 * Card component for displaying content in a card container
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.variant='default'] - Card variant
 * @param {Object} [props.style] - Additional inline styles
 */
const Card = ({ 
  children, 
  variant = 'default',
  onClick,
  style = {},
  ...props 
}) => {
  const getStyles = () => {
    const baseStyle = {
      backgroundColor: colors.cardBackground,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: onClick ? 'pointer' : 'default',
      border: `1px solid ${colors.border}`,
    };

    // Variant styles
    const variantStyles = {
      default: {},
      interactive: {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        }
      },
      meal: {
        borderLeft: `4px solid ${colors.mealBreakfast}`,
      },
      mood: {
        borderLeft: `4px solid ${colors.moodNeutral}`,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const cardStyle = {
    ...getStyles(),
    ...style
  };

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
