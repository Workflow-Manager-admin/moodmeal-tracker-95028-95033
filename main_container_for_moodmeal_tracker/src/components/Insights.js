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
 * Insights component for displaying charts and analytics with futuristic design
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
            fill: true,
            borderColor: colors.textAccent,
            backgroundColor: 'rgba(0, 210, 255, 0.2)',
            tension: 0.4,
            pointBackgroundColor: colors.textAccent,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: colors.textAccent,
            pointHoverBorderColor: colors.textPrimary,
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3,
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
              colors.mealBreakfast + 'DD',  // Added transparency
              colors.mealLunch + 'DD',
              colors.mealDinner + 'DD',
              colors.mealSnack + 'DD'
            ],
            borderColor: [
              colors.mealBreakfast,
              colors.mealLunch,
              colors.mealDinner,
              colors.mealSnack
            ],
            borderWidth: 2,
            borderRadius: 6, // Rounded bar corners
            hoverBackgroundColor: [
              colors.mealBreakfast,
              colors.mealLunch,
              colors.mealDinner,
              colors.mealSnack
            ],
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
        labels: satisfactionLevels.map(level => `${level} ${level === 1 ? 'Star' : 'Stars'}`),
        datasets: [
          {
            label: 'Meal Satisfaction',
            data: satisfactionLevels.map(level => satisfactionCounts[level]),
            backgroundColor: [
              colors.moodTerrible + 'DD',
              colors.moodBad + 'DD',
              colors.moodNeutral + 'DD',
              colors.moodGood + 'DD',
              colors.moodExcellent + 'DD'
            ],
            borderColor: [
              colors.moodTerrible,
              colors.moodBad,
              colors.moodNeutral,
              colors.moodGood,
              colors.moodExcellent
            ],
            borderWidth: 2,
            hoverOffset: 15, // Larger offset on hover
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
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontWeight: '400',
    color: colors.textSecondary,
    margin: '8px 0 0 0',
  };

  const sectionStyle = {
    marginBottom: '36px',
  };

  const sectionHeaderStyle = {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #FFFFFF, #A0A0A0)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const filterBarStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '32px',
    background: 'rgba(42, 42, 45, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '12px 16px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  const filterLabelStyle = {
    fontSize: '15px',
    fontWeight: '600',
    color: colors.textAccent,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginRight: '8px',
  };

  const filterButtonsContainerStyle = {
    display: 'flex',
    gap: '8px',
    flex: '1',
  };

  const chartContainerStyle = {
    background: 'rgba(42, 42, 45, 0.5)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    border: `1px solid ${colors.glassBorder}`,
    position: 'relative',
    overflow: 'hidden',
  };

  const chartOverlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.1) 0%, transparent 70%)',
    zIndex: 1,
  };
  
  const emptyStateStyle = {
    textAlign: 'center',
    padding: '48px 24px',
    color: colors.textSecondary,
  };

  const noDataStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    color: colors.textSecondary,
  };

  const noDataIconStyle = {
    fontSize: '36px',
    marginBottom: '16px',
    opacity: 0.5,
  };
  
  const getTimePeriodButtonStyle = (period) => {
    const isActive = timePeriod === period;
    
    return {
      backgroundColor: isActive ? 'rgba(0, 210, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
      color: isActive ? colors.textAccent : colors.textSecondary,
      border: `1px solid ${isActive ? colors.textAccent : 'transparent'}`,
      borderRadius: '8px',
      padding: '10px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: isActive ? '600' : '500',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? `0 0 15px ${colors.textAccent}40` : 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    };
  };

  // Function to check if chart has data
  const hasData = (chartData) => {
    return chartData.datasets[0]?.data?.some(value => value !== null && value !== 0);
  };

  // Enhanced chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.textPrimary,
          font: {
            family: "'Poppins', sans-serif",
            weight: '500',
            size: 14,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(42, 42, 45, 0.9)',
        titleFont: {
          family: "'Poppins', sans-serif",
          size: 14,
          weight: '600',
        },
        bodyFont: {
          family: "'Poppins', sans-serif",
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        borderColor: colors.glassBorder,
        borderWidth: 1,
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            const value = context.parsed.y;
            if (value === null) return 'No data';
            return `Mood Level: ${value.toFixed(1)}`;
          }
        }
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          color: colors.textSecondary,
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          stepSize: 1,
          callback: function(value) {
            return value.toFixed(0);
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: colors.textSecondary,
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          maxRotation: 0,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        hitRadius: 10,
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(42, 42, 45, 0.9)',
        titleFont: {
          family: "'Poppins', sans-serif",
          size: 14,
          weight: '600',
        },
        bodyFont: {
          family: "'Poppins', sans-serif",
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        borderColor: colors.glassBorder,
        borderWidth: 1,
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            return `Count: ${context.parsed.y}`;
          }
        }
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: colors.textSecondary,
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: colors.textSecondary,
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
        border: {
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
          font: {
            family: "'Poppins', sans-serif",
            size: 14,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(42, 42, 45, 0.9)',
        titleFont: {
          family: "'Poppins', sans-serif",
          size: 14,
          weight: '600',
        },
        bodyFont: {
          family: "'Poppins', sans-serif",
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        borderColor: colors.glassBorder,
        borderWidth: 1,
      },
    },
    layout: {
      padding: 20,
    },
    cutout: '40%',
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: colors.background,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  // Icon for each time period
  const periodIcons = {
    week: '📅',
    month: '📆',
    all: '🗓️',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Insights</h1>
          <p style={subtitleStyle}>Data visualization of your moods and meals</p>
        </div>
      </div>
      
      {meals.length === 0 && moods.length === 0 ? (
        <Card variant="glass">
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ 
              fontSize: '24px', 
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #FFFFFF, #A0A0A0)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>No data available yet</h3>
            <p style={{ fontSize: '16px', marginBottom: '24px', color: colors.textSecondary }}>
              Start logging your meals and moods to see insights here!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
              <Button variant="accent" size="medium" onClick={() => {}} icon="🍲">Log Meal</Button>
              <Button variant="glass" size="medium" onClick={() => {}} icon="😊">Log Mood</Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <div style={filterBarStyle} className="glass-container">
            <div style={filterLabelStyle}>
              <span style={{ fontSize: '18px' }}>⏱️</span>
              <span>Time Period:</span>
            </div>
            <div style={filterButtonsContainerStyle}>
              <button 
                style={getTimePeriodButtonStyle('week')} 
                onClick={() => setTimePeriod('week')}
              >
                <span>{periodIcons.week}</span>
                Last 7 Days
              </button>
              <button 
                style={getTimePeriodButtonStyle('month')} 
                onClick={() => setTimePeriod('month')}
              >
                <span>{periodIcons.month}</span>
                Last 30 Days
              </button>
              <button 
                style={getTimePeriodButtonStyle('all')} 
                onClick={() => setTimePeriod('all')}
              >
                <span>{periodIcons.all}</span>
                All Time
              </button>
            </div>
          </div>
          
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>
              <span style={{ fontSize: '24px' }}>📈</span>
              <span>Mood Trends</span>
            </h2>
            <Card variant="glass">
              <div style={chartContainerStyle}>
                <div style={chartOverlayStyle} />
                {moods.length > 0 && hasData(moodTrendData) ? (
                  <Line options={lineOptions} data={moodTrendData} />
                ) : (
                  <div style={noDataStyle}>
                    <div style={noDataIconStyle}>📉</div>
                    <p>Not enough mood data for the selected time period.</p>
                    <Button variant="glass" size="small" onClick={() => {}} style={{ marginTop: '12px' }} icon="😊">
                      Log A Mood
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>
              <span style={{ fontSize: '24px' }}>🍽️</span>
              <span>Meal Statistics</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <Card variant="glass" style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  background: colors.mealBreakfastGradient,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>🍳</span>
                  <span>Meal Types</span>
                </h3>
                <div style={chartContainerStyle}>
                  <div style={chartOverlayStyle} />
                  {meals.length > 0 && hasData(mealTypeData) ? (
                    <Bar options={barOptions} data={mealTypeData} />
                  ) : (
                    <div style={noDataStyle}>
                      <div style={noDataIconStyle}>🍲</div>
                      <p>Not enough meal data for the selected time period.</p>
                      <Button variant="glass" size="small" onClick={() => {}} style={{ marginTop: '12px' }} icon="🍲">
                        Log A Meal
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
              
              <Card variant="glass" style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  background: colors.moodGoodGradient,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>⭐</span>
                  <span>Meal Satisfaction</span>
                </h3>
                <div style={chartContainerStyle}>
                  <div style={chartOverlayStyle} />
                  {meals.length > 0 && hasData(satisfactionData) ? (
                    <Pie options={pieOptions} data={satisfactionData} />
                  ) : (
                    <div style={noDataStyle}>
                      <div style={noDataIconStyle}>⭐</div>
                      <p>Not enough satisfaction data for the selected time period.</p>
                      <Button variant="glass" size="small" onClick={() => {}} style={{ marginTop: '12px' }} icon="🍲">
                        Rate Your Meals
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          {/* Stats Summary Card */}
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>
              <span style={{ fontSize: '24px' }}>📊</span>
              <span>Summary</span>
            </h2>
            <Card variant="glass">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '24px',
                padding: '12px',
              }}>
                <StatCard 
                  title="Total Moods" 
                  value={filteredMoods.length} 
                  icon="😊"
                  iconColor={colors.moodGood}
                />
                <StatCard 
                  title="Total Meals" 
                  value={filteredMeals.length} 
                  icon="🍲"
                  iconColor={colors.mealBreakfast}
                />
                <StatCard 
                  title="Avg. Satisfaction" 
                  value={filteredMeals.length > 0 ? 
                    (filteredMeals.reduce((sum, meal) => sum + (meal.satisfaction || 3), 0) / filteredMeals.length).toFixed(1) : 
                    'N/A'
                  } 
                  icon="⭐"
                  iconColor="#FFD700"
                />
                <StatCard 
                  title="Most Common Meal" 
                  value={getMostCommonMealType(filteredMeals)} 
                  icon={getMealTypeIcon(getMostCommonMealType(filteredMeals))}
                  iconColor={getMealTypeColor(getMostCommonMealType(filteredMeals))}
                />
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

// Stats card component
const StatCard = ({ title, value, icon, iconColor }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '24px 16px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s ease',
    }} className="glass-card">
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '16px',
        background: `linear-gradient(135deg, ${iconColor}80, ${iconColor}40)`,
        boxShadow: `0 0 15px ${iconColor}60`,
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: '14px',
        fontWeight: '500',
        color: colors.textSecondary,
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #FFFFFF 20%, #A0A0A0)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}>
        {value}
      </div>
    </div>
  );
};

// Helper function to get most common meal type
const getMostCommonMealType = (meals) => {
  if (!meals || meals.length === 0) return 'N/A';
  
  const typeCounts = {};
  meals.forEach(meal => {
    if (meal.type) {
      typeCounts[meal.type] = (typeCounts[meal.type] || 0) + 1;
    }
  });
  
  let maxType = 'snack';
  let maxCount = 0;
  
  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxType = type;
      maxCount = count;
    }
  });
  
  return maxType.charAt(0).toUpperCase() + maxType.slice(1);
};

// Helper function to get meal type color
const getMealTypeColor = (type) => {
  const typeColors = {
    Breakfast: '#42C5FF',
    Lunch: '#9d65ff',
    Dinner: '#FF4187',
    Snack: '#26FFB0',
    'N/A': '#888888',
  };
  return typeColors[type] || typeColors['N/A'];
};

// Helper function to get meal type icon
const getMealTypeIcon = (type) => {
  const icons = {
    Breakfast: '🍳',
    Lunch: '🥗',
    Dinner: '🍽️',
    Snack: '🍎',
    'N/A': '🍽️',
  };
  return icons[type] || icons['N/A'];
};

export default Insights;
