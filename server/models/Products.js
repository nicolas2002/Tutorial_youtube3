module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Products.associate = (models) => {
      Products.belongsToMany(models.Categories, { through: "Product_Category"})
    }
    return Products;
  };