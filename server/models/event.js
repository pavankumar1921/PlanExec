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
    static createEvent(eventName,venue) {
      return this.create({
        eventName,
        venue
      })
    }

    static getEvents(){
      return this.findAll({
        order: [['id',"DESC"]]
      })
    }
    static associate(models) {
      // define association here
    }

    
  }
  Event.init({
    eventName: DataTypes.STRING,
    venue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};