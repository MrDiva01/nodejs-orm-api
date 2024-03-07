const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // You can customize default scope attributes here
        },
        scopes: {
            // You can define additional scopes here if needed
        },
    };

    return sequelize.define('product', attributes, options);
}
