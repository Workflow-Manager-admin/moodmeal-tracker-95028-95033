import React, { createContext, useContext, useReducer, useEffect } from 'react';
import MealEntry from '../models/MealEntry';
import MoodEntry from '../models/MoodEntry';

// Create context
const MoodMealContext = createContext();

// Sample data for demonstration
const generateSampleData = () => {
  const now = new Date();
  
  // Create sample meals
  const sampleMeals = [
    // Today's meals
    new MealEntry({
      name: 'Avocado Toast',
      type: 'breakfast',
      foods: ['Whole grain bread', 'Avocado', 'Poached eggs', 'Cherry tomatoes', 'Feta cheese'],
      satisfaction: 5,
      notes: 'Perfect breakfast! The avocado was perfectly ripe.',
      tags: ['healthy', 'protein', 'favorite'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30).toISOString()
    }),
    new MealEntry({
      name: 'Quinoa Bowl',
      type: 'lunch',
      foods: ['Quinoa', 'Grilled chicken', 'Roasted vegetables', 'Hummus', 'Olive oil'],
      satisfaction: 4,
      notes: 'Filling and nutritious, but a bit bland.',
      tags: ['protein', 'meal prep'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 15).toISOString()
    }),
    new MealEntry({
      name: 'Chocolate Protein Smoothie',
      type: 'snack',
      foods: ['Banana', 'Chocolate protein powder', 'Almond milk', 'Ice'],
      satisfaction: 4,
      notes: 'Perfect post-workout snack',
      tags: ['protein', 'quick'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0).toISOString()
    }),
    
    // Yesterday's meals
    new MealEntry({
      name: 'Overnight Oats',
      type: 'breakfast',
      foods: ['Rolled oats', 'Almond milk', 'Chia seeds', 'Berries', 'Honey'],
      satisfaction: 3,
      notes: 'Added too much chia seeds, texture was too thick',
      tags: ['meal prep', 'breakfast'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 7, 45).toISOString()
    }),
    new MealEntry({
      name: 'Chicken Caesar Salad',
      type: 'lunch',
      foods: ['Romaine lettuce', 'Grilled chicken', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
      satisfaction: 4,
      notes: 'Tasty but the dressing was a bit too heavy',
      tags: ['protein', 'restaurant'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12, 30).toISOString()
    }),
    new MealEntry({
      name: 'Pasta Primavera',
      type: 'dinner',
      foods: ['Whole wheat pasta', 'Bell peppers', 'Zucchini', 'Broccoli', 'Garlic', 'Olive oil'],
      satisfaction: 5,
      notes: 'Delicious and satisfying dinner',
      tags: ['vegetarian', 'homemade'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 19, 0).toISOString()
    }),
    
    // 2 days ago
    new MealEntry({
      name: 'Greek Yogurt with Granola',
      type: 'breakfast',
      foods: ['Greek yogurt', 'Granola', 'Honey', 'Blueberries'],
      satisfaction: 4,
      notes: 'Simple but filling breakfast',
      tags: ['quick', 'protein'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 8, 0).toISOString()
    }),
    new MealEntry({
      name: 'Turkey Sandwich',
      type: 'lunch',
      foods: ['Whole grain bread', 'Turkey', 'Avocado', 'Lettuce', 'Tomato', 'Mustard'],
      satisfaction: 3,
      notes: 'Bread was a bit stale',
      tags: ['quick', 'protein'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 13, 0).toISOString()
    }),
    new MealEntry({
      name: 'Salmon with Roasted Veggies',
      type: 'dinner',
      foods: ['Salmon', 'Sweet potato', 'Brussels sprouts', 'Olive oil', 'Lemon', 'Garlic'],
      satisfaction: 5,
      notes: 'Perfectly cooked salmon, delicious meal',
      tags: ['protein', 'healthy', 'favorite'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 19, 30).toISOString()
    }),
    
    // 3 days ago
    new MealEntry({
      name: 'Smoothie Bowl',
      type: 'breakfast',
      foods: ['Frozen berries', 'Banana', 'Almond milk', 'Spinach', 'Chia seeds', 'Granola'],
      satisfaction: 5,
      notes: 'Beautiful and delicious breakfast',
      tags: ['healthy', 'vegetarian'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 9, 0).toISOString()
    }),
    new MealEntry({
      name: 'Lentil Soup',
      type: 'lunch',
      foods: ['Lentils', 'Carrots', 'Celery', 'Onion', 'Tomatoes', 'Spices'],
      satisfaction: 4,
      notes: 'Hearty and nutritious',
      tags: ['vegetarian', 'homemade'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 12, 45).toISOString()
    }),
    new MealEntry({
      name: 'Tacos',
      type: 'dinner',
      foods: ['Corn tortillas', 'Ground beef', 'Lettuce', 'Tomato', 'Cheese', 'Salsa'],
      satisfaction: 5,
      notes: 'Taco night is always a winner!',
      tags: ['favorite', 'homemade'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 18, 30).toISOString()
    }),
    
    // 4 days ago
    new MealEntry({
      name: 'Peanut Butter Toast',
      type: 'breakfast',
      foods: ['Whole grain bread', 'Peanut butter', 'Banana', 'Honey'],
      satisfaction: 3,
      notes: 'Quick and easy',
      tags: ['quick', 'protein'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 7, 30).toISOString()
    }),
    new MealEntry({
      name: 'Leftover Tacos',
      type: 'lunch',
      foods: ['Corn tortillas', 'Ground beef', 'Lettuce', 'Tomato', 'Cheese', 'Salsa'],
      satisfaction: 4,
      notes: 'Still good the next day!',
      tags: ['leftovers'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 13, 0).toISOString()
    }),
    new MealEntry({
      name: 'Stir-fry',
      type: 'dinner',
      foods: ['Rice', 'Tofu', 'Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce'],
      satisfaction: 2,
      notes: 'Overcooked the veggies',
      tags: ['vegetarian', 'homemade'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 19, 15).toISOString()
    }),
    
    // 5 days ago
    new MealEntry({
      name: 'Fruit Parfait',
      type: 'breakfast',
      foods: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey'],
      satisfaction: 4,
      notes: 'Refreshing start to the day',
      tags: ['quick', 'healthy'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 8, 15).toISOString()
    }),
    new MealEntry({
      name: 'Chicken Wrap',
      type: 'lunch',
      foods: ['Whole wheat wrap', 'Grilled chicken', 'Lettuce', 'Tomato', 'Hummus'],
      satisfaction: 4,
      notes: 'Tasty and filling',
      tags: ['protein', 'quick'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 12, 30).toISOString()
    }),
    new MealEntry({
      name: 'Vegetable Curry',
      type: 'dinner',
      foods: ['Chickpeas', 'Spinach', 'Tomatoes', 'Coconut milk', 'Curry spices', 'Rice'],
      satisfaction: 5,
      notes: 'Perfect amount of spice!',
      tags: ['vegetarian', 'homemade', 'favorite'],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 18, 45).toISOString()
    }),
  ];
  
  // Create sample moods
  const sampleMoods = [
    // Today
    new MoodEntry({
      level: 4,
      notes: "Feeling pretty good today. Had a productive morning.",
      factors: ["good sleep", "productive work", "nice weather"],
      relatedMeals: [sampleMeals[0].id],  // Today's breakfast
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0).toISOString()
    }),
    new MoodEntry({
      level: 3,
      notes: "Energy dipping a bit after lunch.",
      factors: ["work stress", "afternoon slump"],
      relatedMeals: [sampleMeals[1].id],  // Today's lunch
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 30).toISOString()
    }),
    
    // Yesterday
    new MoodEntry({
      level: 2,
      notes: "Woke up on the wrong side of the bed. Feeling grumpy.",
      factors: ["poor sleep", "stress", "bad dreams"],
      relatedMeals: [],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 8, 0).toISOString()
    }),
    new MoodEntry({
      level: 3,
      notes: "Feeling a bit better after lunch break.",
      factors: ["food", "break from work", "talked to friend"],
      relatedMeals: [sampleMeals[4].id],  // Yesterday's lunch
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 0).toISOString()
    }),
    new MoodEntry({
      level: 4,
      notes: "Evening improved! Had a lovely dinner and watched a good movie.",
      factors: ["relaxation", "entertainment", "good meal"],
      relatedMeals: [sampleMeals[5].id],  // Yesterday's dinner
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 20, 30).toISOString()
    }),
    
    // 2 days ago
    new MoodEntry({
      level: 5,
      notes: "Feeling fantastic! Great start to the day.",
      factors: ["good sleep", "exercise", "sunshine"],
      relatedMeals: [sampleMeals[6].id],  // 2 days ago breakfast
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 9, 30).toISOString()
    }),
    new MoodEntry({
      level: 4,
      notes: "Still feeling good. Productive afternoon.",
      factors: ["productivity", "accomplishment"],
      relatedMeals: [],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 16, 0).toISOString()
    }),
    
    // 3 days ago
    new MoodEntry({
      level: 3,
      notes: "Feeling neutral. Nothing special happening.",
      factors: ["routine day", "cloudy weather"],
      relatedMeals: [sampleMeals[9].id],  // 3 days ago breakfast
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 10, 15).toISOString()
    }),
    new MoodEntry({
      level: 5,
      notes: "Evening mood boost! Favorite dinner and good company.",
      factors: ["social time", "good food", "relaxation"],
      relatedMeals: [sampleMeals[11].id],  // 3 days ago dinner
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 19, 45).toISOString()
    }),
    
    // 4 days ago
    new MoodEntry({
      level: 2,
      notes: "Feeling stressed about work deadlines.",
      factors: ["work stress", "deadlines", "not enough sleep"],
      relatedMeals: [],
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 11, 0).toISOString()
    }),
    new MoodEntry({
      level: 1,
      notes: "Terrible headache and feeling overwhelmed.",
      factors: ["headache", "stress", "overworked"],
      relatedMeals: [sampleMeals[14].id],  // 4 days ago dinner - overcooked veggies
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 20, 0).toISOString()
    }),
    
    // 5 days ago
    new MoodEntry({
      level: 3,
      notes: "Average day, feeling okay.",
      factors: ["routine"],
      relatedMeals: [sampleMeals[15].id],  // 5 days ago breakfast
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 9, 0).toISOString()
    }),
    new MoodEntry({
      level: 5,
      notes: "What a great evening! Delicious dinner and feeling accomplished.",
      factors: ["accomplishment", "delicious food", "relaxation"],
      relatedMeals: [sampleMeals[17].id],  // 5 days ago dinner
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 20, 15).toISOString()
    }),
  ];
  
  return { meals: sampleMeals, moods: sampleMoods };
};

// Check if we should use sample data
const USE_SAMPLE_DATA = true;
const sampleData = generateSampleData();

// Initial state
const initialState = {
  meals: USE_SAMPLE_DATA ? sampleData.meals : [],
  moods: USE_SAMPLE_DATA ? sampleData.moods : [],
  loading: false,
  error: null
};

// Action types
const ADD_MEAL = 'ADD_MEAL';
const UPDATE_MEAL = 'UPDATE_MEAL';
const DELETE_MEAL = 'DELETE_MEAL';
const ADD_MOOD = 'ADD_MOOD';
const UPDATE_MOOD = 'UPDATE_MOOD';
const DELETE_MOOD = 'DELETE_MOOD';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const LOAD_DATA = 'LOAD_DATA';

// Reducer function
function moodMealReducer(state, action) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload]
      };
    
    case UPDATE_MEAL:
      return {
        ...state,
        meals: state.meals.map(meal => 
          meal.id === action.payload.id ? action.payload : meal
        )
      };
    
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter(meal => meal.id !== action.payload)
      };
    
    case ADD_MOOD:
      return {
        ...state,
        moods: [...state.moods, action.payload]
      };
    
    case UPDATE_MOOD:
      return {
        ...state,
        moods: state.moods.map(mood => 
          mood.id === action.payload.id ? action.payload : mood
        )
      };
    
    case DELETE_MOOD:
      return {
        ...state,
        moods: state.moods.filter(mood => mood.id !== action.payload)
      };
    
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    case LOAD_DATA:
      // If using sample data and there's no saved data, keep using sample data
      if (USE_SAMPLE_DATA && 
          (!action.payload.meals || action.payload.meals.length === 0) && 
          (!action.payload.moods || action.payload.moods.length === 0)) {
        return state;
      }
      
      return {
        ...state,
        meals: action.payload.meals || [],
        moods: action.payload.moods || [],
        loading: false
      };
    
    default:
      return state;
  }
}

// Provider component
export function MoodMealProvider({ children }) {
  const [state, dispatch] = useReducer(moodMealReducer, initialState);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      try {
        const savedMeals = localStorage.getItem('moodmeal-meals');
        const savedMoods = localStorage.getItem('moodmeal-moods');
        
        const meals = savedMeals ? JSON.parse(savedMeals).map(meal => MealEntry.fromObject(meal)) : [];
        const moods = savedMoods ? JSON.parse(savedMoods).map(mood => MoodEntry.fromObject(mood)) : [];
        
        dispatch({ 
          type: LOAD_DATA, 
          payload: { meals, moods }
        });
      } catch (error) {
        console.error("Error loading data from storage:", error);
        dispatch({ 
          type: SET_ERROR, 
          payload: "Failed to load saved data. Starting with empty state."
        });
      }
    };
    
    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (state.meals.length || state.moods.length) {
      localStorage.setItem('moodmeal-meals', JSON.stringify(state.meals.map(meal => meal.toObject())));
      localStorage.setItem('moodmeal-moods', JSON.stringify(state.moods.map(mood => mood.toObject())));
    }
  }, [state.meals, state.moods]);

  // Action creators
  const addMeal = (meal) => {
    const newMeal = meal instanceof MealEntry ? meal : new MealEntry(meal);
    dispatch({ type: ADD_MEAL, payload: newMeal });
    return newMeal;
  };

  const updateMeal = (meal) => {
    const updatedMeal = meal instanceof MealEntry ? meal : new MealEntry(meal);
    dispatch({ type: UPDATE_MEAL, payload: updatedMeal });
    return updatedMeal;
  };

  const deleteMeal = (id) => {
    dispatch({ type: DELETE_MEAL, payload: id });
  };

  const addMood = (mood) => {
    const newMood = mood instanceof MoodEntry ? mood : new MoodEntry(mood);
    dispatch({ type: ADD_MOOD, payload: newMood });
    return newMood;
  };

  const updateMood = (mood) => {
    const updatedMood = mood instanceof MoodEntry ? mood : new MoodEntry(mood);
    dispatch({ type: UPDATE_MOOD, payload: updatedMood });
    return updatedMood;
  };

  const deleteMood = (id) => {
    dispatch({ type: DELETE_MOOD, payload: id });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: SET_LOADING, payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  return (
    <MoodMealContext.Provider
      value={{
        ...state,
        addMeal,
        updateMeal,
        deleteMeal,
        addMood,
        updateMood,
        deleteMood,
        setLoading,
        setError
      }}
    >
      {children}
    </MoodMealContext.Provider>
  );
}

// Custom hook for using the context
export function useMoodMeal() {
  const context = useContext(MoodMealContext);
  if (!context) {
    throw new Error('useMoodMeal must be used within a MoodMealProvider');
  }
  return context;
}
