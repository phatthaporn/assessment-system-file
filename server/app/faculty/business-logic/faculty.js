const { Faculties } = require("../../../models/index.model")

const create = async (data) => {
    try {
        const result = await Faculties.create(data);
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const findById = async (id) => {
    try {
        const result = await Faculties.findByPk(id);
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const findAll = async () => {
    try {
        const result = await Faculties.findAll();
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const updateById = async (data, id) => {
    try {
        const result = await Faculties.update(data, {where: {id: id}});
        return ({ status: "success", result, message: "Update faculty successfully." })
    }catch(err) {
        return err
    }
}

const deleteById = async (id) => {
    try {
        const result = await Faculties.destroy({where: {id}});
        eturn ({ status: "success", result, message: "Delete faculty successfully." })
    }catch(err) {
        return err
    }
}

module.exports = {
    create,
    findById,
    findAll,
    updateById,
    deleteById
}