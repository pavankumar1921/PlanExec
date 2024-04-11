'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
    static createEvent(eventName,venue,description,date) {
      return this.create({
        eventName,
        venue,
        description,
        date
      })
    }

    static getEvents(){
      return this.findAll({
        order: [['id',"DESC"]]
      })
    }
  }
  Event.init({
    eventName: DataTypes.STRING,
    venue: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};