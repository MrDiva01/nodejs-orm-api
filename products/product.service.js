const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    // Validate
    if (await db.Product.findOne({ where: { name: params.name } })) {
        throw 'Product with name "' + params.name + '" already exists';
    }

    // Create product
    const product = new db.Product(params);
    await product.save();
}

async function update(id, params) {
    const product = await getProduct(id);

    // Validate
    const nameChanged = params.name && product.name !== params.name;
    if (nameChanged && await db.Product.findOne({ where: { name: params.name } })) {
        throw 'Product with name "' + params.name + '" already exists';
    }

    // Copy params to product and save
    Object.assign(product, params);
    await product.save();
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}
