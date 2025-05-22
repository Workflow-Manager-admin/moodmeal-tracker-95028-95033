import React, { useState, useEffect } from 'react';
import { useMoodMeal } from '../context/MoodMealContext';
import Card from './ui/Card';
import Button from './ui/Button';
import colors from '../theme/colors';
import { formatDisplayDate, getLastNDays } from '../utils/dateUtils';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * Insights component for displaying charts and analytics
 */
const Insights = () => {
  const { meals, moods } = useMoodMeal();
  const [timePeriod, setTimePeriod] = useState('week'); // week, month, all
  
  // Filter data based on selected time period
  const filterByTimePeriod = (entries) => {
    const now = new Date();
    let cutoff = new Date();
    
    switch(timePeriod) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case 'all':
      default:
        return entries;
    }
    
    return entries.filter(entry => new Date(entry.date) >= cutoff);
  };
  
  const filteredMeals = filterByTimePeriod(meals);
  const filteredMoods = filterByTimePeriod(moods);
  
  // Prepare data for charts
  const [moodTrendData, setMoodTrendData] = useState({ labels: [], datasets: [] });
  const [mealTypeData, setMealTypeData] = useState({ labels: [], datasets: [] });
  const [satisfactionData, setSatisfactionData] = useState({ labels: [], datasets: [] });
  
  useEffect(() => {
    // Mood trend over time
    const prepareMoodTrendData = () => {
      const days = timePeriod === 'week' ? 7 : (timePeriod === 'month' ? 30 : Math.min(90, moods.length));
      const dateLabels = getLastNDays(days).map(date => formatDisplayDate(date));
      
      // Create a map of date -> mood level
      const moodsByDate = {};
      filteredMoods.forEach(mood => {
        const dateKey = new Date(mood.date).toLocaleDateString();
        if (!moodsByDate[dateKey]) {
          moodsByDate[dateKey] = [];
        }
        moodsByDate[dateKey].push(mood.level);
      });
      
      // Calculate average mood for each day
      const moodData = dateLabels.map(date => {
        const dateKey = new Date(date).toLocaleDateString();
        const moods = moodsByDate[dateKey] || [];
        return moods.length > 0 ? 
          moods.reduce((sum, level) => sum + level, 0) / moods.length : 
          null;
      });
      
      setMoodTrendData({
        labels: dateLabels,
        datasets: [
          {
            label: 'Mood Level',
            data: moodData,
            fill: false,
            borderColor: colors.primary,
            tension: 0.4,
            pointBackgroundColor: colors.primary,
          }
        ]
      });
    };
    
    // Meal types distribution
    const prepareMealTypeData = () => {
      const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
      const typeCounts = {};
      
      mealTypes.forEach(type => {
        typeCounts[type] = filteredMeals.filter(meal => meal.type === type).length;
      });
      
      setMealTypeData({
        labels: mealTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)),
        datasets: [
          {
            label: 'Number of Meals',
            data: mealTypes.map(type => typeCounts[type]),
            backgroundColor: [
              colors.mealBreakfast,
              colors.mealLunch,
              colors.mealDinner,
              colors.mealSnack
            ],
            borderWidth: 1,
          }
        ]
      });
    };
    
    // Satisfaction distribution
    const prepareSatisfactionData = () => {
      const satisfactionLevels = [1, 2, 3, 4, 5];
      const satisfactionCounts = {};
      
      satisfactionLevels.forEach(level => {
        satisfactionCounts[level] = filteredMeals.filter(meal => meal.satisfaction === level).length;
      });
      
      setSatisfactionData({
        labels: satisfactionLevels.map(level => `${level} Star${level !== 1 ? 's' : ''}`),
        datasets: [
          {
            label: 'Meal Satisfaction',
            data: satisfactionLevels.map(level => satisfactionCounts[level]),
            backgroundColor: [
              colors.moodTerrible,
              colors.moodBad,
              colors.moodNeutral,
              colors.moodGood,
              colors.moodExcellent
            ],
            borderWidth: 1,
          }
        ]
      });
    };
    
    prepareMoodTrendData();
    prepareMealTypeData();
    prepareSatisfactionData();
  }, [filteredMeals, filteredMoods, timePeriod, moods.length]);
  
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

  const filterBarStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  };

  const chartContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
  };
  
  const emptyStateStyle = {
    textAlign: 'center',
    padding: '32px',
    color: colors.textSecondary,
  };

  const noDataStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    color: colors.textSecondary,
  };
  
  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Trend Over Time',
        color: colors.textPrimary,
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          color: colors.textSecondary,
        },
        grid: {
          color: colors.border,
        },
      },
      x: {
        ticks: {
          color: colors.textSecondary,
        },
        grid: {
          color: colors.border,
        },
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Meal Types Distribution',
        color: colors.textPrimary,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: colors.textSecondary,
        },
        grid: {
          color: colors.border,
        },
      },
      x: {
        ticks: {
          color: colors.textSecondary,
        },
        grid: {
          display: false,
        },
      },
    },
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: colors.textSecondary,
        },
      },
      title: {
        display: true,
        text: 'Meal Satisfaction Distribution',
        color: colors.textPrimary,
      },
    },
  };
  
  const getTimePeriodButtonStyle = (period) => ({
    backgroundColor: timePeriod === period ? colors.primary : 'transparent',
    color: timePeriod === period ? colors.textPrimary : colors.textSecondary,
    border: `1px solid ${timePeriod === period ? colors.primary : colors.border}`,
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: timePeriod === period ? '500' : '400',
  });

  // Function to check if chart has data
  const hasData = (chartData) => {
    return chartData.datasets[0]?.data?.some(value => value !== null && value !== 0);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Insights</h1>
      </div>
      
      {meals.length === 0 && moods.length === 0 ? (
        <Card>
          <div style={emptyStateStyle}>
            <h3>No data available yet</h3>
            <p>Start logging your meals and moods to see insights here!</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
              <Button variant="primary" size="medium" onClick={() => {}}>Log Meal</Button>
              <Button variant="secondary" size="medium" onClick={() => {}}>Log Mood</Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <div style={filterBarStyle}>
            <button 
              style={getTimePeriodButtonStyle('week')} 
              onClick={() => setTimePeriod('week')}
            >
              Last 7 Days
            </button>
            <button 
              style={getTimePeriodButtonStyle('month')} 
              onClick={() => setTimePeriod('month')}
            >
              Last 30 Days
            </button>
            <button 
              style={getTimePeriodButtonStyle('all')} 
              onClick={() => setTimePeriod('all')}
            >
              All Time
            </button>
          </div>
          
          <div style={sectionStyle}>
            <h2>Mood Trends</h2>
            <Card>
              <div style={chartContainerStyle}>
                {moods.length > 0 && hasData(moodTrendData) ? (
                  <Line options={lineOptions} data={moodTrendData} />
                ) : (
                  <div style={noDataStyle}>
                    <p>Not enough mood data for the selected time period.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          <div style={sectionStyle}>
            <h2>Meal Statistics</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <Card style={{ flex: 1, minWidth: '300px' }}>
                <h3>Meal Types</h3>
                <div style={chartContainerStyle}>
                  {meals.length > 0 && hasData(mealTypeData) ? (
                    <Bar options={barOptions} data={mealTypeData} />
                  ) : (
                    <div style={noDataStyle}>
                      <p>Not enough meal data for the selected time period.</p>
                    </div>
                  )}
                </div>
              </Card>
              
              <Card style={{ flex: 1, minWidth: '300px' }}>
                <h3>Meal Satisfaction</h3>
                <div style={chartContainerStyle}>
                  {meals.length > 0 && hasData(satisfactionData) ? (
                    <Pie options={pieOptions} data={satisfactionData} />
                  ) : (
                    <div style={noDataStyle}>
                      <p>Not enough satisfaction data for the selected time period.</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          {/* Additional insight sections could be added here */}
        </>
      )}
    </div>
  );
};

export default Insights;
