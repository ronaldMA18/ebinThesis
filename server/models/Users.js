module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    contactNum: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  });

  return Users;
};
