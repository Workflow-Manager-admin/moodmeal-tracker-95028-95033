import React, { useState } from 'react';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import MealEntry from '../models/MealEntry';
import colors from '../theme/colors';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * MealLogger component for logging meals
 */
const MealLogger = () => {
  const { meals, addMeal, updateMeal, deleteMeal } = useMoodMeal();
  
  // Sort meals by date (newest first)
  const sortedMeals = [...meals].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  
  // Form state
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('snack');
  const [mealFoods, setMealFoods] = useState('');
  const [mealSatisfaction, setMealSatisfaction] = useState(3);
  const [mealNotes, setMealNotes] = useState('');
  const [mealTags, setMealTags] = useState('');

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

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\'%3e%3cpath d=\'M7 10l5 5 5-5z\'/%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '20px',
  };

  const satisfactionContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const satisfactionLabelStyle = {
    marginRight: '16px',
    fontWeight: '500',
  };

  const satisfactionButtonStyle = (isSelected) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '0 8px',
    backgroundColor: isSelected ? colors.primary : 'transparent',
    color: isSelected ? colors.textPrimary : colors.textSecondary,
    border: `1px solid ${isSelected ? colors.primary : colors.border}`,
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  };

  const mealItemStyle = {
    marginBottom: '16px',
  };

  const mealHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  };

  const mealTitleStyle = {
    fontSize: '18px',
    fontWeight: '500',
  };

  const mealTimeStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
  };

  const mealDetailStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
    marginBottom: '8px',
  };

  const mealFoodsStyle = {
    fontSize: '16px',
    marginBottom: '8px',
  };

  const tagStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(232, 122, 65, 0.2)',
    color: colors.primary,
    padding: '4px 8px',
    borderRadius: '16px',
    marginRight: '8px',
    marginBottom: '8px',
    fontSize: '12px',
  };

  const mealActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
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

  const resetForm = () => {
    setMealName('');
    setMealType('snack');
    setMealFoods('');
    setMealSatisfaction(3);
    setMealNotes('');
    setMealTags('');
    setEditingMeal(null);
  };

  const handleShowForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditMeal = (meal) => {
    setMealName(meal.name || '');
    setMealType(meal.type || 'snack');
    setMealFoods(meal.foods.join(', '));
    setMealSatisfaction(meal.satisfaction || 3);
    setMealNotes(meal.notes || '');
    setMealTags(meal.tags.join(', '));
    setEditingMeal(meal);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process foods and tags
    const foodsArray = mealFoods.split(',')
      .map(food => food.trim())
      .filter(food => food !== '');
      
    const tagsArray = mealTags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    if (editingMeal) {
      // Update existing meal
      const updatedMeal = {
        ...editingMeal,
        name: mealName,
        type: mealType,
        foods: foodsArray,
        satisfaction: mealSatisfaction,
        notes: mealNotes,
        tags: tagsArray
      };
      updateMeal(updatedMeal);
    } else {
      // Create new meal
      const newMeal = new MealEntry({
        name: mealName,
        type: mealType,
        foods: foodsArray,
        satisfaction: mealSatisfaction,
        notes: mealNotes,
        tags: tagsArray,
        date: new Date().toISOString()
      });
      addMeal(newMeal);
    }
    
    // Reset form
    resetForm();
    setShowForm(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const handleDeleteMeal = (id) => {
    if (window.confirm('Are you sure you want to delete this meal entry?')) {
      deleteMeal(id);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Meal Tracker</h1>
        {!showForm && (
          <Button 
            variant="primary"
            onClick={handleShowForm}
          >
            Add Meal
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="mealName">Meal Name</label>
              <input
                type="text"
                id="mealName"
                style={inputStyle}
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="e.g., Breakfast Smoothie"
              />
            </div>
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="mealType">Meal Type</label>
              <select
                id="mealType"
                style={selectStyle}
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="mealFoods">Foods (comma separated)</label>
              <input
                type="text"
                id="mealFoods"
                style={inputStyle}
                value={mealFoods}
                onChange={(e) => setMealFoods(e.target.value)}
                placeholder="e.g., Banana, Yogurt, Honey"
              />
            </div>
            
            <div style={satisfactionContainerStyle}>
              <div style={satisfactionLabelStyle}>Satisfaction:</div>
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  style={satisfactionButtonStyle(level === mealSatisfaction)}
                  onClick={() => setMealSatisfaction(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="mealNotes">Notes</label>
              <textarea
                id="mealNotes"
                style={textareaStyle}
                value={mealNotes}
                onChange={(e) => setMealNotes(e.target.value)}
                placeholder="Add any notes about this meal..."
              />
            </div>
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="mealTags">Tags (comma separated)</label>
              <input
                type="text"
                id="mealTags"
                style={inputStyle}
                value={mealTags}
                onChange={(e) => setMealTags(e.target.value)}
                placeholder="e.g., healthy, homemade, quick"
              />
            </div>
            
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
                {editingMeal ? 'Update Meal' : 'Add Meal'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <h2>Your Meal Entries</h2>
      
      {sortedMeals.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '20px', color: colors.textSecondary }}>
            You haven't logged any meals yet. Click "Add Meal" to get started!
          </div>
        </Card>
      ) : (
        sortedMeals.map(meal => (
          <Card 
            key={meal.id}
            style={{
              borderLeft: `4px solid ${getMealTypeColor(meal.type)}`,
              ...mealItemStyle
            }}
          >
            <div style={mealHeaderStyle}>
              <div style={mealTitleStyle}>
                {meal.name || `${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}`}
              </div>
              <div style={mealTimeStyle}>
                {formatDisplayDate(meal.date)} at {formatDisplayTime(meal.date)}
              </div>
            </div>
            
            <div style={mealDetailStyle}>
              <strong style={{ textTransform: 'capitalize' }}>{meal.type}</strong> • Satisfaction: {meal.satisfaction}/5
            </div>
            
            {meal.foods.length > 0 && (
              <div style={mealFoodsStyle}>
                <strong>Foods:</strong> {meal.foods.join(', ')}
              </div>
            )}
            
            {meal.notes && (
              <div>
                <strong>Notes:</strong> {meal.notes}
              </div>
            )}
            
            {meal.tags.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                {meal.tags.map((tag, index) => (
                  <span key={index} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div style={mealActionsStyle}>
              <Button
                variant="outline"
                size="small"
                onClick={() => handleEditMeal(meal)}
                style={{ marginRight: '8px' }}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="small"
                onClick={() => handleDeleteMeal(meal.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default MealLogger;
