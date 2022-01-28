module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Categories.associate = (models) => {
      Categories.belongsToMany(models.Products, { through: "Product_Category"})
    }
    return Categories;
  };