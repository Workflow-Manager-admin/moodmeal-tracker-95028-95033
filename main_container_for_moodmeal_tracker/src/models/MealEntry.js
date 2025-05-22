/**
 * MealEntry class - Represents a meal entry in the MoodMeal Tracker
 */
class MealEntry {
  /**
   * Create a meal entry
   * 
   * @param {Object} data - The meal entry data
   * @param {string} data.id - Unique identifier for the entry
   * @param {string} data.name - Name of the meal
   * @param {string} data.type - Type of meal (breakfast, lunch, dinner, snack)
   * @param {Date|string} data.date - Date and time of the meal
   * @param {Array} data.foods - Array of foods consumed
   * @param {number} data.satisfaction - Satisfaction level (1-5)
   * @param {string} data.notes - Additional notes about the meal
   * @param {Array} data.tags - Tags associated with this meal
   */
  constructor(data = {}) {
    this.id = data.id || this._generateId();
    this.name = data.name || '';
    this.type = data.type || 'snack'; // breakfast, lunch, dinner, snack
    this.date = data.date || new Date().toISOString();
    this.foods = data.foods || [];
    this.satisfaction = data.satisfaction || 3; // 1-5 scale
    this.notes = data.notes || '';
    this.tags = data.tags || [];
  }

  /**
   * Generate a unique ID for the entry
   * 
   * @returns {string} A unique ID
   * @private
   */
  _generateId() {
    return 'meal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Convert to a plain object for storage
   * 
   * @returns {Object} Plain object representation
   */
  toObject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      date: this.date,
      foods: this.foods,
      satisfaction: this.satisfaction,
      notes: this.notes,
      tags: this.tags
    };
  }

  /**
   * Create a MealEntry instance from a plain object
   * 
   * @param {Object} obj - Plain object with meal data
   * @returns {MealEntry} New MealEntry instance
   */
  static fromObject(obj) {
    return new MealEntry(obj);
  }
}

export default MealEntry;
