module.exports = (sequelize, DataTypes) => {
  const logs = sequelize.define(
    "logs",
    {
      id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
      idOfEvent: { type: DataTypes.NUMBER },
      activity: { type: DataTypes.STRING },
      dateCreated: { type: DataTypes.DATE },
    },
    {
      timestamps: false, // disable timestamps feature
    }
  );

  return logs;
};
