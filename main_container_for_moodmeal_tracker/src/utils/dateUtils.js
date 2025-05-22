/**
 * Utility functions for date manipulation and formatting
 */

/**
 * Format a date to display format (e.g., May 22, 2023)
 * 
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a date to time format (e.g., 2:30 PM)
 * 
 * @param {Date} date - The date to format
 * @returns {string} Formatted time string
 */
export const formatDisplayTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get the current date in ISO format
 * 
 * @returns {string} Current date in ISO format
 */
export const getCurrentDateISO = () => {
  return new Date().toISOString();
};

/**
 * Group entries by date
 * 
 * @param {Array} entries - Array of entries with date property
 * @returns {Object} Object with dates as keys and arrays of entries as values
 */
export const groupEntriesByDate = (entries) => {
  return entries.reduce((groups, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {});
};

/**
 * Get an array of the last n days
 * 
 * @param {number} days - Number of days to get
 * @returns {Array} Array of Date objects
 */
export const getLastNDays = (days) => {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date);
  }
  return result;
};
