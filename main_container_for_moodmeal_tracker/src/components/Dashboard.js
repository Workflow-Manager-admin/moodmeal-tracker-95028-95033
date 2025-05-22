import React from 'react';
import { Link } from 'react-router-dom';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import colors from '../theme/colors';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * Dashboard component showing summary of meals and moods with futuristic design
 */
const Dashboard = () => {
  const { meals, moods } = useMoodMeal();
  
  // Get today's entries
  const today = new Date().toLocaleDateString();
  const todaysMeals = meals.filter(meal => new Date(meal.date).toLocaleDateString() === today);
  const todaysMoods = moods.filter(mood => new Date(mood.date).toLocaleDateString() === today);
  
  // Get latest entries
  const latestMeals = [...meals].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const latestMoods = [...moods].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  // Calculate average mood
  const averageMood = moods.length 
    ? (moods.reduce((sum, mood) => sum + mood.level, 0) / moods.length).toFixed(1) 
    : 'No data';

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
    marginBottom: '24px',
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
    marginBottom: '8px',
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontWeight: '400',
    color: colors.textSecondary,
    margin: '0',
    marginTop: '8px',
  };

  const sectionStyle = {
    marginBottom: '36px',
  };

  const sectionHeaderStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    letterSpacing: '-0.3px',
    background: 'linear-gradient(135deg, #FFFFFF, #A0A0A0)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  };

  const statCardStyle = {
    padding: '24px 20px',
    borderRadius: '16px',
    background: 'rgba(42, 42, 45, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${colors.glassBorder}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const statValueStyle = {
    fontSize: '32px',
    fontWeight: '700',
    margin: '10px 0',
    background: colors.primaryGradient,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    textShadow: `0 0 10px ${colors.primaryGlow}`,
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
    fontWeight: '500',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '32px',
    color: colors.textSecondary,
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  };

  const entryItemStyle = {
    padding: '16px',
    borderBottom: `1px solid ${colors.glassBorder}`,
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.03)',
    },
  };

  const entryHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  };

  const entryTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.textPrimary,
    display: 'flex',
    alignItems: 'center',
  };

  const entryTimeStyle = {
    fontSize: '14px',
    color: colors.textAccent,
    fontWeight: '500',
  };

  const entryDetailStyle = {
    fontSize: '15px',
    color: colors.textSecondary,
    marginTop: '6px',
    lineHeight: '1.4',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: colors.textAccent,
    fontWeight: '500',
    transition: 'all 0.2s ease',
    position: 'relative',
    padding: '0 2px',
    ':hover': {
      color: `${colors.primary}`,
      textShadow: `0 0 8px ${colors.primaryGlow}`,
    },
  };

  const actionButtonsStyle = {
    display: 'flex',
    gap: '12px',
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

  const renderStatCards = () => (
    <div style={statsContainerStyle}>
      <div style={statCardStyle} className="glass-container">
        <div style={statLabelStyle}>Total Meals</div>
        <div style={statValueStyle}>{meals.length}</div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: colors.mealBreakfastGradient,
        }} />
      </div>
      <div style={statCardStyle} className="glass-container">
        <div style={statLabelStyle}>Total Moods</div>
        <div style={statValueStyle}>{moods.length}</div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: colors.moodNeutralGradient,
        }} />
      </div>
      <div style={statCardStyle} className="glass-container">
        <div style={statLabelStyle}>Average Mood</div>
        <div style={{...statValueStyle, display: 'flex', alignItems: 'center', gap: '8px'}}>
          {typeof averageMood === 'string' ? (
            averageMood
          ) : (
            <>
              <span>{averageMood}</span>
              <span style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: getMoodGradient(Math.round(averageMood)),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 15px ${getMoodColor(Math.round(averageMood))}80`,
              }}>
                {getMoodEmoji(Math.round(averageMood))}
              </span>
            </>
          )}
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: typeof averageMood === 'string' 
            ? colors.moodNeutralGradient
            : getMoodGradient(Math.round(averageMood)),
        }} />
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Dashboard</h1>
          <p style={subtitleStyle}>Track your mood and meal patterns</p>
        </div>
        <div style={actionButtonsStyle}>
          <Button 
            variant="glass"
            size="small"
            icon="🍲"
            onClick={() => {}}
            animation="pulse"
          >
            Log Meal
          </Button>
          <Button 
            variant="glass"
            size="small"
            icon="😊"
            onClick={() => {}}
          >
            Log Mood
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div style={sectionStyle}>
        {renderStatCards()}
      </div>

      {/* Today's Summary */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={{ margin: 0 }}>Today's Summary</h2>
        </div>
        <Card variant="glass">
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            background: colors.mealBreakfastGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>Meals</h3>
          
          {todaysMeals.length > 0 ? (
            <div>
              {todaysMeals.map(meal => (
                <div key={meal.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: getMealTypeColor(meal.type),
                        marginRight: '10px',
                        boxShadow: `0 0 8px ${getMealTypeColor(meal.type)}`,
                      }} />
                      {meal.name || meal.type}
                    </div>
                    <div style={entryTimeStyle}>{formatDisplayTime(meal.date)}</div>
                  </div>
                  <div style={entryDetailStyle}>
                    {meal.foods.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStateStyle}>
              No meals logged today. <Link to="/meals" style={linkStyle}>Log a meal</Link>
            </div>
          )}

          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginTop: '24px',
            marginBottom: '16px',
            background: colors.moodNeutralGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>Moods</h3>
          
          {todaysMoods.length > 0 ? (
            <div>
              {todaysMoods.map(mood => (
                <div key={mood.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>
                      <span style={{
                        display: 'inline-flex',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: getMoodGradient(mood.level),
                        marginRight: '10px',
                        boxShadow: `0 0 12px ${getMoodColor(mood.level)}80`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                      }}>
                        {getMoodEmoji(mood.level)}
                      </span>
                      {mood.getMoodName()}
                    </div>
                    <div style={entryTimeStyle}>{formatDisplayTime(mood.date)}</div>
                  </div>
                  {mood.notes && (
                    <div style={entryDetailStyle}>
                      {mood.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStateStyle}>
              No moods logged today. <Link to="/moods" style={linkStyle}>Log your mood</Link>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Activity */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={{ margin: 0 }}>Recent Activity</h2>
          <Link to="/insights" style={{
            ...linkStyle,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            View all
            <span style={{ fontSize: '18px' }}>→</span>
          </Link>
        </div>
        <Card variant="glass">
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            background: colors.mealBreakfastGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>Recent Meals</h3>
          
          {latestMeals.length > 0 ? (
            <div>
              {latestMeals.map(meal => (
                <div key={meal.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: getMealTypeColor(meal.type),
                        marginRight: '10px',
                        boxShadow: `0 0 8px ${getMealTypeColor(meal.type)}`,
                      }} />
                      {meal.name || meal.type}
                    </div>
                    <div style={entryTimeStyle}>{formatDisplayDate(meal.date)}</div>
                  </div>
                  <div style={entryDetailStyle}>
                    {meal.foods.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStateStyle}>
              No meal entries yet. <Link to="/meals" style={linkStyle}>Log your first meal</Link>
            </div>
          )}

          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginTop: '24px',
            marginBottom: '16px',
            background: colors.moodNeutralGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>Recent Moods</h3>
          
          {latestMoods.length > 0 ? (
            <div>
              {latestMoods.map(mood => (
                <div key={mood.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>
                      <span style={{
                        display: 'inline-flex',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: getMoodGradient(mood.level),
                        marginRight: '10px',
                        boxShadow: `0 0 12px ${getMoodColor(mood.level)}80`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                      }}>
                        {getMoodEmoji(mood.level)}
                      </span>
                      {mood.getMoodName()}
                    </div>
                    <div style={entryTimeStyle}>{formatDisplayDate(mood.date)}</div>
                  </div>
                  {mood.notes && (
                    <div style={entryDetailStyle}>
                      {mood.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={emptyStateStyle}>
              No mood entries yet. <Link to="/moods" style={linkStyle}>Log your first mood</Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// Helper function to get color based on meal type
const getMealTypeColor = (type) => {
  const typeColors = {
    breakfast: colors.mealBreakfast,
    lunch: colors.mealLunch,
    dinner: colors.mealDinner,
    snack: colors.mealSnack
  };
  return typeColors[type] || colors.mealSnack;
};

export default Dashboard;
