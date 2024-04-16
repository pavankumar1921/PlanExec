'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static createService(name,description,contact) {
      return this.create({
        name,
        description,
        contact
      })
    }

    static getServices(){
      return this.findAll({
        order: [['id','DESC']]
      })
    }

  }
  Services.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Services',
  });
  return Services;
};