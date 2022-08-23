const { FacultyMajors } = require("../../../models/index.model")

const create = async (data) => {
    try {
        const result = await FacultyMajors.create(data);
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const findById = async (id) => {
    try {
        const result = await FacultyMajors.findByPk(id);
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const findByFacultyId = async (id) => {
    try {
        const result = await FacultyMajors.findAll({where: {facultyId: id}, order: [['createdAt', 'ASC']]});
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const findAll = async () => {
    try {
        const result = await FacultyMajors.findAll();
        return ({ status: "success", result })
    }catch(err) {
        return err
    }
}

const updateById = async (data, id) => {
    try {
        const result = await FacultyMajors.update(data, {where: {id}});
        return ({ status: "success", result, message: "Update faculty successfully." })
    }catch(err) {
        return err
    }
}

const deleteById = async (id) => {
    try {
        const data = await FacultyMajors.findByPk(id);
        if(data === undefined) {
            return ({ status: "fail", message: "Can't find this id!"})
        }
        const result = await FacultyMajors.destroy({where: {id}});
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
    deleteById,
    findByFacultyId
}