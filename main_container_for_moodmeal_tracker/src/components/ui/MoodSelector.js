import React from 'react';
import colors from '../../theme/colors';

/**
 * MoodSelector component for selecting mood levels with futuristic UI
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current mood value (1-5)
 * @param {function} props.onChange - Change handler function
 */
const MoodSelector = ({ value = 3, onChange }) => {
  const moods = [
    { 
      value: 1, 
      name: 'Terrible', 
      color: colors.moodTerrible, 
      gradient: colors.moodTerribleGradient,
      icon: '😣' 
    },
    { 
      value: 2, 
      name: 'Bad', 
      color: colors.moodBad, 
      gradient: colors.moodBadGradient,
      icon: '😟' 
    },
    { 
      value: 3, 
      name: 'Neutral', 
      color: colors.moodNeutral, 
      gradient: colors.moodNeutralGradient,
      icon: '😐' 
    },
    { 
      value: 4, 
      name: 'Good', 
      color: colors.moodGood, 
      gradient: colors.moodGoodGradient,
      icon: '🙂' 
    },
    { 
      value: 5, 
      name: 'Excellent', 
      color: colors.moodExcellent, 
      gradient: colors.moodExcellentGradient,
      icon: '😁' 
    }
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '16px',
    padding: '12px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)', // Very subtle background
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  };

  const moodButtonStyle = (mood) => {
    const isSelected = value === mood.value;
    
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      opacity: isSelected ? 1 : 0.6,
      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
      transition: 'all var(--transition-medium) ease-out',
      padding: '8px',
      borderRadius: '8px',
      background: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      // Add pulse animation for selected mood
      animation: isSelected ? 'pulse 3s infinite' : 'none',
    };
  };

  const iconStyle = (mood) => {
    const isSelected = value === mood.value;
    
    return {
      fontSize: '24px',
      marginBottom: '8px',
      padding: '12px',
      borderRadius: '50%',
      background: isSelected ? mood.gradient : 'transparent',
      border: `2px solid ${isSelected ? mood.color : 'rgba(255, 255, 255, 0.1)'}`,
      transition: 'all var(--transition-medium) ease-out',
      boxShadow: isSelected 
        ? `0 0 15px ${mood.color}80` // Add glow effect with 50% opacity
        : 'none',
    };
  };

  const labelStyle = (mood) => {
    const isSelected = value === mood.value;
    
    return {
      fontSize: '12px',
      textAlign: 'center',
      marginTop: '4px',
      fontWeight: isSelected ? '500' : '400',
      color: isSelected ? mood.color : colors.textSecondary,
      transition: 'all var(--transition-medium) ease',
    };
  };

  const handleMoodSelect = (moodValue) => {
    if (onChange) {
      onChange(moodValue);
    }
  };

  return (
    <div style={containerStyle} className="glass-card">
      {moods.map((mood) => (
        <div
          key={mood.value}
          style={moodButtonStyle(mood)}
          onClick={() => handleMoodSelect(mood.value)}
          className="fade-in"
        >
          <div style={iconStyle(mood)}>
            {mood.icon}
          </div>
          <div style={labelStyle(mood)}>{mood.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;
