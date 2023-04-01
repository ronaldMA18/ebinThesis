module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      contactNum: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
    },
    {
      timestamps: false, // disable timestamps feature
    }
  );

  return users;
};
