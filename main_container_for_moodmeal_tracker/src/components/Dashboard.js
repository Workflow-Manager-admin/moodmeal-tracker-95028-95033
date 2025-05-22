import React from 'react';
import { Link } from 'react-router-dom';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import colors from '../theme/colors';
import { formatDisplayDate, formatDisplayTime } from '../utils/dateUtils';

/**
 * Dashboard component showing summary of meals and moods
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

  const sectionStyle = {
    marginBottom: '32px',
  };

  const sectionHeaderStyle = {
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const statsContainerStyle = {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  };

  const statCardStyle = {
    flex: 1,
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: colors.cardBackground,
    border: `1px solid ${colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const statValueStyle = {
    fontSize: '24px',
    fontWeight: '600',
    margin: '8px 0',
    color: colors.primary,
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '24px',
    color: colors.textSecondary,
  };

  const entryItemStyle = {
    padding: '12px',
    borderBottom: `1px solid ${colors.border}`,
  };

  const entryHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  };

  const entryTitleStyle = {
    fontSize: '16px',
    fontWeight: '500',
  };

  const entryTimeStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
  };

  const entryDetailStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
    marginTop: '4px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: colors.primary,
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button 
            variant="primary"
            size="small"
            onClick={() => {}}
          >
            Log Meal
          </Button>
          <Button 
            variant="secondary"
            size="small"
            onClick={() => {}}
          >
            Log Mood
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div style={sectionStyle}>
        <div style={statsContainerStyle}>
          <div style={statCardStyle}>
            <div style={statLabelStyle}>Total Meals</div>
            <div style={statValueStyle}>{meals.length}</div>
          </div>
          <div style={statCardStyle}>
            <div style={statLabelStyle}>Total Moods</div>
            <div style={statValueStyle}>{moods.length}</div>
          </div>
          <div style={statCardStyle}>
            <div style={statLabelStyle}>Average Mood</div>
            <div style={statValueStyle}>
              {typeof averageMood === 'string' ? averageMood : `${averageMood} ${getMoodEmoji(Math.round(averageMood))}`}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={{ margin: 0 }}>Today's Summary</h2>
        </div>
        <Card>
          <h3>Meals</h3>
          {todaysMeals.length > 0 ? (
            <div>
              {todaysMeals.map(meal => (
                <div key={meal.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>{meal.name || meal.type}</div>
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

          <h3>Moods</h3>
          {todaysMoods.length > 0 ? (
            <div>
              {todaysMoods.map(mood => (
                <div key={mood.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>
                      <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: getMoodColor(mood.level),
                        marginRight: '8px',
                        textAlign: 'center',
                        lineHeight: '20px'
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
          <Link to="/insights" style={linkStyle}>View all</Link>
        </div>
        <Card>
          <h3>Recent Meals</h3>
          {latestMeals.length > 0 ? (
            <div>
              {latestMeals.map(meal => (
                <div key={meal.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>{meal.name || meal.type}</div>
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

          <h3>Recent Moods</h3>
          {latestMoods.length > 0 ? (
            <div>
              {latestMoods.map(mood => (
                <div key={mood.id} style={entryItemStyle}>
                  <div style={entryHeaderStyle}>
                    <div style={entryTitleStyle}>
                      <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: getMoodColor(mood.level),
                        marginRight: '8px',
                        textAlign: 'center',
                        lineHeight: '20px'
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

export default Dashboard;
