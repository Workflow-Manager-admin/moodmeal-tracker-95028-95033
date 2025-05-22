import React, { createContext, useContext, useReducer, useEffect } from 'react';
import MealEntry from '../models/MealEntry';
import MoodEntry from '../models/MoodEntry';

// Create context
const MoodMealContext = createContext();

// Initial state
const initialState = {
  meals: [],
  moods: [],
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
