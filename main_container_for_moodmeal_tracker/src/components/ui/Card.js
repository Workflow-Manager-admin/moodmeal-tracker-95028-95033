import React from 'react';
import colors from '../../theme/colors';

/**
 * Card component for displaying content in a futuristic card container
 * with glass effect and animated hover states
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.variant='default'] - Card variant (default, glass, interactive, meal, mood, stat)
 * @param {boolean} [props.neonBorder=false] - Whether to add a neon gradient border
 * @param {Object} [props.style] - Additional inline styles
 */
const Card = ({ 
  children, 
  variant = 'default',
  neonBorder = false,
  onClick,
  style = {},
  ...props 
}) => {
  const getStyles = () => {
    const baseStyle = {
      backgroundColor: colors.cardBackground,
      borderRadius: '12px', // More rounded for futuristic look
      padding: '16px',
      marginBottom: '16px',
      boxShadow: colors.shadowLight,
      transition: 'all var(--transition-medium) ease',
      cursor: onClick ? 'pointer' : 'default',
      border: `1px solid ${colors.border}`,
      position: 'relative', // For potential pseudo-elements
      overflow: 'hidden', // For gradient effects that might overflow
    };

    // Variant styles
    const variantStyles = {
      default: {},
      glass: {
        background: 'rgba(42, 42, 45, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${colors.glassBorder}`,
        boxShadow: colors.shadowMedium,
      },
      interactive: {
        ':hover': {
          transform: 'translateY(-3px)',
          boxShadow: colors.shadowMedium,
        }
      },
      meal: {
        borderLeft: `4px solid ${colors.mealBreakfast}`,
      },
      mood: {
        borderLeft: `4px solid ${colors.moodNeutral}`,
      },
      stat: {
        borderRadius: '12px',
        background: 'rgba(42, 42, 45, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '16px',
        transition: 'all var(--transition-medium) ease',
        border: `1px solid ${colors.glassBorder}`,
        overflow: 'hidden',
        position: 'relative',
        ':before': {
          content: "''",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundImage: colors.primaryGradient,
        },
        ':hover': {
          transform: 'translateY(-3px)',
          boxShadow: colors.shadowMedium,
        }
      }
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Combine all styles
  const cardStyle = {
    ...getStyles(),
    ...(isHovered && getStyles()[':hover']),
    ...style,
  };

  // Add the gradient top accent for stat cards
  const statAccent = variant === 'stat' ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundImage: colors.primaryGradient,
  } : null;

  // Additional classes to apply
  const classNames = [
    variant === 'glass' ? 'glass-container' : '',
    neonBorder ? 'neon-border' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classNames || undefined}
      {...props}
    >
      {variant === 'stat' && <div style={statAccent} />}
      {children}
    </div>
  );
};

export default Card;
