'use strict';
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicID: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topic",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.Topic, {
      foreignKey: "topicID",
      onDelete: "CASCADE",
    });
  };
  return Banner;
};
