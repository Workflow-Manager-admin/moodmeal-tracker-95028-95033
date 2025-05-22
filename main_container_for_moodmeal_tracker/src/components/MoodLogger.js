import React, { useState } from 'react';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import MoodSelector from './ui/MoodSelector';
import MoodEntry from '../models/MoodEntry';
import colors from '../theme/colors';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * MoodLogger component for logging mood entries
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
    paddingTop: '70px',
  };

  const headerStyle = {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0',
  };

  const formStyle = {
    marginBottom: '24px',
  };

  const formRowStyle = {
    marginBottom: '16px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: colors.textPrimary,
    fontSize: '16px',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  };

  const moodItemStyle = {
    marginBottom: '16px',
  };

  const moodHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  };

  const moodTitleStyle = {
    fontSize: '18px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
  };

  const moodTimeStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
  };

  const moodDetailStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
    marginBottom: '8px',
  };

  const moodFactorsStyle = {
    fontSize: '16px',
    marginBottom: '8px',
  };

  const moodActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  };

  const mealCheckboxContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Mood Tracker</h1>
        {!showForm && (
          <Button 
            variant="primary"
            onClick={handleShowForm}
          >
            Log Mood
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>How are you feeling?</label>
              <MoodSelector value={moodLevel} onChange={setMoodLevel} />
            </div>
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="moodNotes">Notes</label>
              <textarea
                id="moodNotes"
                style={textareaStyle}
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                placeholder="Add any notes about how you're feeling..."
              />
            </div>
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="moodFactors">Factors (comma separated)</label>
              <input
                type="text"
                id="moodFactors"
                style={inputStyle}
                value={moodFactors}
                onChange={(e) => setMoodFactors(e.target.value)}
                placeholder="e.g., stress, lack of sleep, exercise"
              />
            </div>
            
            {recentMeals.length > 0 && (
              <div style={formRowStyle}>
                <label style={labelStyle}>Related Meals</label>
                <div style={mealCheckboxContainerStyle}>
                  {recentMeals.map(meal => (
                    <label key={meal.id} style={checkboxStyle}>
                      <input
                        type="checkbox"
                        checked={selectedMeals.includes(meal.id)}
                        onChange={() => handleMealCheckboxChange(meal.id)}
                      />
                      <span>
                        {meal.name || meal.type} ({formatDisplayTime(meal.date)})
                      </span>
                    </label>
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
                variant="primary"
                size="medium"
                type="submit"
              >
                {editingMood ? 'Update Mood' : 'Log Mood'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <h2>Your Mood History</h2>
      
      {sortedMoods.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '20px', color: colors.textSecondary }}>
            You haven't logged any moods yet. Click "Log Mood" to get started!
          </div>
        </Card>
      ) : (
        sortedMoods.map(mood => {
          const moodColor = getMoodColor(mood.level);
          return (
            <Card 
              key={mood.id}
              style={{
                borderLeft: `4px solid ${moodColor}`,
                ...moodItemStyle
              }}
            >
              <div style={moodHeaderStyle}>
                <div style={moodTitleStyle}>
                  <span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: moodColor,
                    marginRight: '8px',
                    textAlign: 'center',
                    lineHeight: '24px'
                  }}>
                    {getMoodEmoji(mood.level)}
                  </span>
                  {getMoodName(mood.level)}
                </div>
                <div style={moodTimeStyle}>
                  {formatDisplayDate(mood.date)} at {formatDisplayTime(mood.date)}
                </div>
              </div>
              
              {mood.notes && (
                <div style={moodDetailStyle}>
                  {mood.notes}
                </div>
              )}
              
              {mood.factors.length > 0 && (
                <div style={moodFactorsStyle}>
                  <strong>Factors:</strong> {mood.factors.join(', ')}
                </div>
              )}
              
              {mood.relatedMeals.length > 0 && (
                <div>
                  <strong>Related Meals:</strong>
                  <ul>
                    {mood.relatedMeals.map(mealId => {
                      const relatedMeal = meals.find(m => m.id === mealId);
                      return relatedMeal ? (
                        <li key={mealId}>
                          {relatedMeal.name || relatedMeal.type} ({formatDisplayTime(relatedMeal.date)})
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
              
              <div style={moodActionsStyle}>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => handleEditMood(mood)}
                  style={{ marginRight: '8px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => handleDeleteMood(mood.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default MoodLogger;
