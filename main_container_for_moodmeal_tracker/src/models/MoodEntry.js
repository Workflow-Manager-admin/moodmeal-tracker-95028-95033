/**
 * MoodEntry class - Represents a mood entry in the MoodMeal Tracker
 */
class MoodEntry {
  /**
   * Create a mood entry
   * 
   * @param {Object} data - The mood entry data
   * @param {string} data.id - Unique identifier for the entry
   * @param {number} data.level - Mood level (1-5, where 1 is terrible, 5 is excellent)
   * @param {Date|string} data.date - Date and time of the mood recording
   * @param {string} data.notes - Additional notes about the mood
   * @param {Array} data.factors - Factors that might have influenced the mood
   * @param {Array} data.relatedMeals - IDs of meals related to this mood
   */
  constructor(data = {}) {
    this.id = data.id || this._generateId();
    this.level = data.level || 3; // 1-5 scale
    this.date = data.date || new Date().toISOString();
    this.notes = data.notes || '';
    this.factors = data.factors || [];
    this.relatedMeals = data.relatedMeals || [];
  }

  /**
   * Generate a unique ID for the entry
   * 
   * @returns {string} A unique ID
   * @private
   */
  _generateId() {
    return 'mood_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Convert to a plain object for storage
   * 
   * @returns {Object} Plain object representation
   */
  toObject() {
    return {
      id: this.id,
      level: this.level,
      date: this.date,
      notes: this.notes,
      factors: this.factors,
      relatedMeals: this.relatedMeals
    };
  }

  /**
   * Create a MoodEntry instance from a plain object
   * 
   * @param {Object} obj - Plain object with mood data
   * @returns {MoodEntry} New MoodEntry instance
   */
  static fromObject(obj) {
    return new MoodEntry(obj);
  }

  /**
   * Get the mood name based on the level
   * 
   * @returns {string} Mood name
   */
  getMoodName() {
    const moodNames = {
      1: 'Terrible',
      2: 'Bad',
      3: 'Neutral',
      4: 'Good',
      5: 'Excellent'
    };
    return moodNames[this.level] || 'Unknown';
  }
}

export default MoodEntry;
