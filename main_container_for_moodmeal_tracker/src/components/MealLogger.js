import React, { useState } from 'react';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import MealEntry from '../models/MealEntry';
import colors from '../theme/colors';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * MealLogger component for logging meals with futuristic UI
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

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\'%3e%3cpath d=\'M7 10l5 5 5-5z\'/%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '20px',
    paddingRight: '40px',
  };

  const satisfactionContainerStyle = {
    marginBottom: '24px',
  };

  const satisfactionLabelStyle = {
    marginBottom: '12px',
    fontWeight: '600',
    display: 'block',
    fontSize: '16px',
    color: colors.textPrimary,
    letterSpacing: '0.3px',
  };

  const satisfactionButtonsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
    padding: '12px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  };

  const satisfactionButtonStyle = (level, isSelected) => {
    // Get the appropriate color gradient based on satisfaction level
    let gradient;
    switch(level) {
      case 1: gradient = colors.moodTerribleGradient; break;
      case 2: gradient = colors.moodBadGradient; break;
      case 3: gradient = colors.moodNeutralGradient; break;
      case 4: gradient = colors.moodGoodGradient; break;
      case 5: gradient = colors.moodExcellentGradient; break;
      default: gradient = colors.moodNeutralGradient;
    }
    
    return {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: isSelected ? gradient : 'rgba(255, 255, 255, 0.05)',
      color: isSelected ? colors.textPrimary : colors.textSecondary,
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '700',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      boxShadow: isSelected ? '0 0 15px rgba(255, 255, 255, 0.2)' : 'none',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    };
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    marginTop: '32px',
  };

  const mealItemStyle = {
    marginBottom: '20px',
    transition: 'all 0.3s ease',
  };

  const mealCardInnerStyle = {
    position: 'relative',
    overflow: 'hidden',
  };

  const mealHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  };

  const mealTitleStyle = {
    fontSize: '22px',
    fontWeight: '600',
    background: colors.primaryGradient,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const mealTimeStyle = {
    fontSize: '14px',
    color: colors.textAccent,
    fontWeight: '500',
    letterSpacing: '0.3px',
  };

  const mealDetailStyle = {
    fontSize: '15px',
    color: colors.textPrimary,
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const mealInfoIconStyle = {
    fontSize: '16px',
    color: colors.textAccent,
    marginRight: '4px',
  };

  const mealFoodsStyle = {
    fontSize: '16px',
    marginBottom: '12px',
    color: colors.textSecondary,
    lineHeight: '1.5',
  };

  const tagContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
  };

  const tagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(232, 122, 65, 0.15)',
    color: colors.primary,
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: `1px solid rgba(232, 122, 65, 0.2)`,
    boxShadow: '0 2px 10px rgba(232, 122, 65, 0.1)',
  };

  const mealActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px',
  };

  const mealTypeIndicatorStyle = (type) => {
    const mealColor = getMealTypeColor(type);
    const mealGradient = getMealTypeGradient(type);
    
    return {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '4px',
      background: mealGradient,
      boxShadow: `0 0 10px ${mealColor}80`,
    };
  };

  const satisfactionIndicatorStyle = (level) => {
    let gradient;
    switch(level) {
      case 1: gradient = colors.moodTerribleGradient; break;
      case 2: gradient = colors.moodBadGradient; break;
      case 3: gradient = colors.moodNeutralGradient; break;
      case 4: gradient = colors.moodGoodGradient; break;
      case 5: gradient = colors.moodExcellentGradient; break;
      default: gradient = colors.moodNeutralGradient;
    }
    
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: gradient,
      marginLeft: '8px',
      fontSize: '14px',
      fontWeight: '700',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
    };
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

  const getMealTypeGradient = (type) => {
    const typeGradients = {
      breakfast: colors.mealBreakfastGradient,
      lunch: colors.mealLunchGradient,
      dinner: colors.mealDinnerGradient,
      snack: colors.mealSnackGradient
    };
    return typeGradients[type] || colors.mealSnackGradient;
  };

  const getMealTypeIcon = (type) => {
    const typeIcons = {
      breakfast: '🍳',
      lunch: '🥗',
      dinner: '🍽️',
      snack: '🍎'
    };
    return typeIcons[type] || '🍎';
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

  // Custom Input component with focus state
  const FuturisticInput = ({ id, label, value, onChange, placeholder, type = 'text', as = 'input' }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const InputComponent = as === 'textarea' ? 'textarea' : 'input';
    const componentStyle = as === 'textarea' ? textareaStyle : inputStyle;
    
    return (
      <div style={formRowStyle}>
        <label style={labelStyle} htmlFor={id}>{label}</label>
        <div style={inputWrapperStyle}>
          <InputComponent
            id={id}
            type={type}
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Meal Tracker</h1>
        </div>
        {!showForm && (
          <Button 
            variant="glass"
            size="medium"
            onClick={handleShowForm}
            icon="🍲"
            animation="pulse"
          >
            Add Meal
          </Button>
        )}
      </div>

      {showForm && (
        <div style={formContainerStyle} className="fade-in">
          <form onSubmit={handleSubmit} style={formStyle}>
            <FuturisticInput
              id="mealName"
              label="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g., Breakfast Smoothie"
            />
            
            <div style={formRowStyle}>
              <label style={labelStyle} htmlFor="mealType">Meal Type</label>
              <div style={inputWrapperStyle}>
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
            </div>
            
            <FuturisticInput
              id="mealFoods"
              label="Foods (comma separated)"
              value={mealFoods}
              onChange={(e) => setMealFoods(e.target.value)}
              placeholder="e.g., Banana, Yogurt, Honey"
            />
            
            <div style={satisfactionContainerStyle}>
              <div style={satisfactionLabelStyle}>Satisfaction Level</div>
              <div style={satisfactionButtonsStyle} className="glass-card">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    style={satisfactionButtonStyle(level, level === mealSatisfaction)}
                    onClick={() => setMealSatisfaction(level)}
                    className={level === mealSatisfaction ? "pulse" : ""}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <FuturisticInput
              id="mealNotes"
              label="Notes"
              value={mealNotes}
              onChange={(e) => setMealNotes(e.target.value)}
              placeholder="Add any notes about this meal..."
              as="textarea"
            />
            
            <FuturisticInput
              id="mealTags"
              label="Tags (comma separated)"
              value={mealTags}
              onChange={(e) => setMealTags(e.target.value)}
              placeholder="e.g., healthy, homemade, quick"
            />
            
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
                {editingMeal ? 'Update Meal' : 'Add Meal'}
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
      }}>Your Meal Entries</h2>
      
      {sortedMeals.length === 0 ? (
        <Card variant="glass">
          <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSecondary }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🍽️</div>
            <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No meals logged yet</div>
            <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '24px' }}>Click "Add Meal" to start tracking your nutrition</div>
            <Button variant="primary" size="medium" onClick={handleShowForm}>Add Your First Meal</Button>
          </div>
        </Card>
      ) : (
        sortedMeals.map(meal => (
          <Card 
            key={meal.id}
            variant="glass"
            style={mealItemStyle}
          >
            <div style={mealCardInnerStyle}>
              <div style={mealTypeIndicatorStyle(meal.type)} />
              
              <div style={mealHeaderStyle}>
                <div style={mealTitleStyle}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: getMealTypeGradient(meal.type),
                    boxShadow: `0 0 15px ${getMealTypeColor(meal.type)}60`,
                  }}>
                    {getMealTypeIcon(meal.type)}
                  </span>
                  {meal.name || `${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}`}
                </div>
                <div style={mealTimeStyle}>
                  {formatDisplayDate(meal.date)} at {formatDisplayTime(meal.date)}
                </div>
              </div>
              
              <div style={mealDetailStyle}>
                <span style={{ 
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600',
                  fontSize: '13px',
                  color: getMealTypeColor(meal.type),
                  padding: '4px 10px',
                  background: `rgba(${hexToRgb(getMealTypeColor(meal.type))}, 0.1)`,
                  borderRadius: '4px',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}>
                  {meal.type}
                </span>
                <span style={{ color: colors.textSecondary }}>•</span>
                <span>
                  Satisfaction:
                  <span style={satisfactionIndicatorStyle(meal.satisfaction)}>
                    {meal.satisfaction}
                  </span>
                </span>
              </div>
              
              {meal.foods.length > 0 && (
                <div style={mealFoodsStyle}>
                  <span style={mealInfoIconStyle}>🍴</span>
                  <strong style={{ color: colors.textPrimary }}>Foods: </strong> 
                  {meal.foods.join(', ')}
                </div>
              )}
              
              {meal.notes && (
                <div style={mealFoodsStyle}>
                  <span style={mealInfoIconStyle}>📝</span>
                  <strong style={{ color: colors.textPrimary }}>Notes: </strong> 
                  {meal.notes}
                </div>
              )}
              
              {meal.tags.length > 0 && (
                <div style={tagContainerStyle}>
                  {meal.tags.map((tag, index) => (
                    <span key={index} style={tagStyle}>
                      # {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div style={mealActionsStyle}>
                <Button
                  variant="glass"
                  size="small"
                  onClick={() => handleEditMeal(meal)}
                  icon="✏️"
                >
                  Edit
                </Button>
                <Button
                  variant="glass"
                  size="small"
                  onClick={() => handleDeleteMeal(meal.id)}
                  icon="🗑️"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

// Helper function to convert hex color to rgb for opacity adjustments
const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
};

export default MealLogger;
