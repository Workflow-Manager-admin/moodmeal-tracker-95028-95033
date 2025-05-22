import React from 'react';
import colors from '../../theme/colors';

/**
 * MoodSelector component for selecting mood levels
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current mood value (1-5)
 * @param {function} props.onChange - Change handler function
 */
const MoodSelector = ({ value = 3, onChange }) => {
  const moods = [
    { value: 1, name: 'Terrible', color: colors.moodTerrible, icon: '😣' },
    { value: 2, name: 'Bad', color: colors.moodBad, icon: '😟' },
    { value: 3, name: 'Neutral', color: colors.moodNeutral, icon: '😐' },
    { value: 4, name: 'Good', color: colors.moodGood, icon: '🙂' },
    { value: 5, name: 'Excellent', color: colors.moodExcellent, icon: '😁' }
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '16px',
  };

  const moodButtonStyle = (mood) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    opacity: value === mood.value ? 1 : 0.6,
    transform: value === mood.value ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.2s ease',
  });

  const iconStyle = (mood) => ({
    fontSize: '24px',
    marginBottom: '4px',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: value === mood.value ? mood.color : 'transparent',
    border: `2px solid ${mood.color}`,
    transition: 'all 0.2s ease',
  });

  const labelStyle = {
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '4px',
    color: colors.textSecondary,
  };

  const handleMoodSelect = (moodValue) => {
    if (onChange) {
      onChange(moodValue);
    }
  };

  return (
    <div style={containerStyle}>
      {moods.map((mood) => (
        <div
          key={mood.value}
          style={moodButtonStyle(mood)}
          onClick={() => handleMoodSelect(mood.value)}
        >
          <div style={iconStyle(mood)}>
            {mood.icon}
          </div>
          <div style={labelStyle}>{mood.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MoodSelector;
