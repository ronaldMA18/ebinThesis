module.exports = (sequelize, DataTypes) => {
  const ebins = sequelize.define(
    "ebins",
    {
      id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
      locationName: { type: DataTypes.STRING },
      long: { type: DataTypes.STRING },
      lat: { type: DataTypes.STRING },
      status: { type: DataTypes.NUMBER },
      timeUpdated: { type: DataTypes.DATE },
    },
    {
      timestamps: false, // disable timestamps feature
    }
  );

  return ebins;
};
