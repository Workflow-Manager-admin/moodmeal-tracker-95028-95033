import React, { useState } from 'react';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import MoodSelector from './ui/MoodSelector';
import MoodEntry from '../models/MoodEntry';
import colors from '../theme/colors';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * MoodLogger component for logging mood entries with futuristic UI
 */
const MoodLogger = () => {
  const { moods, addMood, updateMood, deleteMood, meals } = useMoodMeal();
  
  // Sort moods by date (newest first)
  const sortedMoods = [...moods].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const [showForm, setShowForm] = useState(false);
  const [editingMood, setEditingMood] = useState(null);
  
  // Form state
  const [moodLevel, setMoodLevel] = useState(3);
  const [moodNotes, setMoodNotes] = useState('');
  const [moodFactors, setMoodFactors] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);

  // Recent meals for relating to mood
  const recentMeals = [...meals]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px',
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '90px',
    animation: 'fadeIn 0.6s ease-out',
  };

  const headerStyle = {
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0',
    background: 'linear-gradient(135deg, #FFFFFF, #A0A0A0)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    letterSpacing: '-0.5px',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const formContainerStyle = {
    marginBottom: '32px',
    animation: 'fadeIn 0.4s ease-out',
  };

  const formStyle = {
    padding: '24px',
    borderRadius: '16px',
    background: 'rgba(42, 42, 45, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${colors.glassBorder}`,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  };

  const formRowStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '600',
    fontSize: '16px',
    color: colors.textPrimary,
    letterSpacing: '0.3px',
  };

  const inputWrapperStyle = {
    position: 'relative',
    width: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: `1px solid ${colors.glassBorder}`,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: colors.textPrimary,
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
  };

  const inputFocusStyle = {
    borderColor: colors.primary,
    boxShadow: `0 0 0 2px ${colors.primaryGlow}, inset 0 2px 10px rgba(0, 0, 0, 0.1)`,
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    marginTop: '32px',
  };

  const moodItemStyle = {
    marginBottom: '20px',
    transition: 'all 0.3s ease',
  };

  const moodCardInnerStyle = {
    position: 'relative',
    overflow: 'hidden',
  };

  const moodHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const moodTitleStyle = {
    fontSize: '22px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
  };

  const moodTimeStyle = {
    fontSize: '14px',
    color: colors.textAccent,
    fontWeight: '500',
    letterSpacing: '0.3px',
  };

  const moodDetailStyle = {
    fontSize: '15px',
    color: colors.textSecondary,
    marginBottom: '16px',
    lineHeight: '1.5',
  };

  const moodFactorsStyle = {
    fontSize: '16px',
    marginBottom: '16px',
    color: colors.textSecondary,
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  };

  const moodInfoIconStyle = {
    color: colors.textAccent,
    fontSize: '16px',
    marginTop: '2px',
  };

  const moodRelatedMealsStyle = {
    marginTop: '16px',
  };

  const relatedMealListStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '8px 0 0 0',
  };

  const relatedMealItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    marginBottom: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  };

  const mealCheckboxContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '12px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  };

  const checkboxLabelStyle = (isChecked) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: isChecked ? 'rgba(232, 122, 65, 0.1)' : 'transparent',
    color: isChecked ? colors.textPrimary : colors.textSecondary,
    border: isChecked ? `1px solid ${colors.primaryGlow}` : '1px solid transparent',
  });

  const customCheckboxStyle = (isChecked) => ({
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: `2px solid ${isChecked ? colors.primary : colors.border}`,
    backgroundColor: isChecked ? colors.primary : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: isChecked ? `0 0 8px ${colors.primaryGlow}` : 'none',
  });

  const checkmarkStyle = {
    color: 'white',
    fontSize: '14px',
  };

  const moodActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px',
  };

  const moodIndicatorStyle = (level) => {
    const moodColor = getMoodColor(level);
    const moodGradient = getMoodGradient(level);
    
    return {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '4px',
      background: moodGradient,
      boxShadow: `0 0 10px ${moodColor}80`,
    };
  };

  const factorChipStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: colors.textPrimary,
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 8px 8px 0',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const factorsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '8px',
  };

  const getMoodColor = (level) => {
    const moodColors = {
      1: colors.moodTerrible,
      2: colors.moodBad,
      3: colors.moodNeutral,
      4: colors.moodGood,
      5: colors.moodExcellent
    };
    return moodColors[level] || colors.moodNeutral;
  };

  const getMoodGradient = (level) => {
    const moodGradients = {
      1: colors.moodTerribleGradient,
      2: colors.moodBadGradient,
      3: colors.moodNeutralGradient,
      4: colors.moodGoodGradient,
      5: colors.moodExcellentGradient
    };
    return moodGradients[level] || colors.moodNeutralGradient;
  };

  const getMoodEmoji = (level) => {
    const moodEmojis = {
      1: '😣',
      2: '😟',
      3: '😐',
      4: '🙂',
      5: '😁'
    };
    return moodEmojis[level] || '😐';
  };

  const getMoodName = (level) => {
    const moodNames = {
      1: 'Terrible',
      2: 'Bad',
      3: 'Neutral',
      4: 'Good',
      5: 'Excellent'
    };
    return moodNames[level] || 'Unknown';
  };

  const getMealTypeColor = (type) => {
    const typeColors = {
      breakfast: colors.mealBreakfast,
      lunch: colors.mealLunch,
      dinner: colors.mealDinner,
      snack: colors.mealSnack
    };
    return typeColors[type] || colors.mealSnack;
  };

  const getMealIcon = (type) => {
    const mealIcons = {
      breakfast: '🍳',
      lunch: '🥗',
      dinner: '🍽️',
      snack: '🍎'
    };
    return mealIcons[type] || '🍎';
  };

  const resetForm = () => {
    setMoodLevel(3);
    setMoodNotes('');
    setMoodFactors('');
    setSelectedMeals([]);
    setEditingMood(null);
  };

  const handleShowForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditMood = (mood) => {
    setMoodLevel(mood.level || 3);
    setMoodNotes(mood.notes || '');
    setMoodFactors(mood.factors.join(', '));
    setSelectedMeals(mood.relatedMeals || []);
    setEditingMood(mood);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process factors
    const factorsArray = moodFactors.split(',')
      .map(factor => factor.trim())
      .filter(factor => factor !== '');
    
    if (editingMood) {
      // Update existing mood
      const updatedMood = {
        ...editingMood,
        level: moodLevel,
        notes: moodNotes,
        factors: factorsArray,
        relatedMeals: selectedMeals
      };
      updateMood(updatedMood);
    } else {
      // Create new mood
      const newMood = new MoodEntry({
        level: moodLevel,
        notes: moodNotes,
        factors: factorsArray,
        relatedMeals: selectedMeals,
        date: new Date().toISOString()
      });
      addMood(newMood);
    }
    
    // Reset form
    resetForm();
    setShowForm(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const handleDeleteMood = (id) => {
    if (window.confirm('Are you sure you want to delete this mood entry?')) {
      deleteMood(id);
    }
  };

  const handleMealCheckboxChange = (mealId) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(selectedMeals.filter(id => id !== mealId));
    } else {
      setSelectedMeals([...selectedMeals, mealId]);
    }
  };

  // Custom Input component with focus state
  const FuturisticInput = ({ id, label, value, onChange, placeholder, as = 'input' }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const InputComponent = as === 'textarea' ? 'textarea' : 'input';
    const componentStyle = as === 'textarea' ? textareaStyle : inputStyle;
    
    return (
      <div style={formRowStyle}>
        <label style={labelStyle} htmlFor={id}>{label}</label>
        <div style={inputWrapperStyle}>
          <InputComponent
            id={id}
            style={{
              ...componentStyle,
              ...(isFocused ? inputFocusStyle : {})
            }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
    );
  };

  // Custom Checkbox component
  const FuturisticCheckbox = ({ id, label, checked, onChange, icon, time }) => {
    return (
      <div style={checkboxLabelStyle(checked)} onClick={onChange}>
        <div style={customCheckboxStyle(checked)}>
          {checked && <span style={checkmarkStyle}>✓</span>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
            <span style={{ fontWeight: 500 }}>{label}</span>
          </div>
          {time && <div style={{ fontSize: '12px', color: colors.textAccent, marginTop: '2px' }}>{time}</div>}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Mood Tracker</h1>
        </div>
        {!showForm && (
          <Button 
            variant="glass"
            size="medium"
            onClick={handleShowForm}
            icon="😊"
            animation="pulse"
          >
            Log Mood
          </Button>
        )}
      </div>

      {showForm && (
        <div style={formContainerStyle} className="fade-in">
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formRowStyle}>
              <label style={{...labelStyle, marginBottom: '16px'}}>How are you feeling?</label>
              <MoodSelector value={moodLevel} onChange={setMoodLevel} />
            </div>
            
            <FuturisticInput
              id="moodNotes"
              label="Notes"
              value={moodNotes}
              onChange={(e) => setMoodNotes(e.target.value)}
              placeholder="Add any notes about how you're feeling..."
              as="textarea"
            />
            
            <FuturisticInput
              id="moodFactors"
              label="Factors (comma separated)"
              value={moodFactors}
              onChange={(e) => setMoodFactors(e.target.value)}
              placeholder="e.g., stress, lack of sleep, exercise"
            />
            
            {recentMeals.length > 0 && (
              <div style={formRowStyle}>
                <label style={labelStyle}>Related Meals</label>
                <div style={mealCheckboxContainerStyle} className="glass-card">
                  {recentMeals.map(meal => (
                    <FuturisticCheckbox
                      key={meal.id}
                      id={`meal-${meal.id}`}
                      label={meal.name || meal.type}
                      checked={selectedMeals.includes(meal.id)}
                      onChange={() => handleMealCheckboxChange(meal.id)}
                      icon={getMealIcon(meal.type)}
                      time={formatDisplayTime(meal.date)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div style={buttonContainerStyle}>
              <Button
                variant="outline"
                size="medium"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                size="medium"
                type="submit"
                animation="glow"
              >
                {editingMood ? 'Update Mood' : 'Log Mood'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #FFFFFF, #A0A0A0)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}>Your Mood History</h2>
      
      {sortedMoods.length === 0 ? (
        <Card variant="glass">
          <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSecondary }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>😊</div>
            <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No moods logged yet</div>
            <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '24px' }}>Click "Log Mood" to start tracking your emotions</div>
            <Button variant="primary" size="medium" onClick={handleShowForm}>Log Your First Mood</Button>
          </div>
        </Card>
      ) : (
        sortedMoods.map(mood => {
          const moodColor = getMoodColor(mood.level);
          const moodGradient = getMoodGradient(mood.level);
          
          return (
            <Card 
              key={mood.id}
              variant="glass"
              style={moodItemStyle}
            >
              <div style={moodCardInnerStyle}>
                <div style={moodIndicatorStyle(mood.level)} />
                
                <div style={moodHeaderStyle}>
                  <div style={moodTitleStyle}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: moodGradient,
                      boxShadow: `0 0 15px ${moodColor}80`,
                      marginRight: '14px',
                      fontSize: '22px'
                    }}>
                      {getMoodEmoji(mood.level)}
                    </span>
                    <span style={{
                      background: moodGradient,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}>
                      {getMoodName(mood.level)}
                    </span>
                  </div>
                  <div style={moodTimeStyle}>
                    {formatDisplayDate(mood.date)} at {formatDisplayTime(mood.date)}
                  </div>
                </div>
                
                {mood.notes && (
                  <div style={moodDetailStyle}>
                    <div style={{
                      fontSize: '14px',
                      color: colors.textSecondary,
                      marginBottom: '6px',
                      fontWeight: '500',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}>Notes</div>
                    <div style={{
                      fontSize: '16px',
                      color: colors.textPrimary,
                      lineHeight: '1.6',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(5px)',
                      WebkitBackdropFilter: 'blur(5px)',
                    }}>
                      "{mood.notes}"
                    </div>
                  </div>
                )}
                
                {mood.factors.length > 0 && (
                  <div style={moodFactorsStyle}>
                    <span style={moodInfoIconStyle}>🔍</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '14px',
                        color: colors.textSecondary,
                        marginBottom: '6px',
                        fontWeight: '500',
                      }}>Factors:</div>
                      <div style={factorsContainerStyle}>
                        {mood.factors.map((factor, idx) => (
                          <span key={idx} style={factorChipStyle}>
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {mood.relatedMeals.length > 0 && (
                  <div style={moodRelatedMealsStyle}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: colors.textSecondary,
                      marginBottom: '12px',
                      fontWeight: '500',
                    }}>
                      <span style={{ fontSize: '16px' }}>🍽️</span>
                      <span>Related Meals</span>
                    </div>
                    <ul style={relatedMealListStyle}>
                      {mood.relatedMeals.map(mealId => {
                        const relatedMeal = meals.find(m => m.id === mealId);
                        return relatedMeal ? (
                          <li key={mealId} style={relatedMealItemStyle}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              fontSize: '14px'
                            }}>
                              {getMealIcon(relatedMeal.type)}
                            </span>
                            <div>
                              <span style={{ fontWeight: '500' }}>{relatedMeal.name || relatedMeal.type}</span>
                              <span style={{ color: colors.textAccent, fontSize: '13px', marginLeft: '8px' }}>
                                {formatDisplayTime(relatedMeal.date)}
                              </span>
                            </div>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
                
                <div style={moodActionsStyle}>
                  <Button
                    variant="glass"
                    size="small"
                    onClick={() => handleEditMood(mood)}
                    icon="✏️"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="glass"
                    size="small"
                    onClick={() => handleDeleteMood(mood.id)}
                    icon="🗑️"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default MoodLogger;
