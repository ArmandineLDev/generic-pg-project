const genericDataMapper = require("../datamapper/genericDataMapper");
const bcrypt = require('bcrypt')

const genericController = {
    async getAll(request, response, next) {
        try {
            const { entity } = request.params;
            const data = await genericDataMapper.getAll(entity);

            if (data) {
                response.json({ data });
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },

    async getOne(request, response, next) {
        try {
            const { entity, id } = request.params;
            const data = await genericDataMapper.getOne(entity, id);
            if (data) {
                response.json({ data });
            }
        } catch (error) {
            next(error);
        }
    },

    async createOne(request, response, next) {
        try {
            const { entity } = request.params;
            const newDatas = request.body;

            if (entity === 'member') {
                const hashedPassword = bcrypt.hashSync(newDatas.password, 10);
                newDatas.password = hashedPassword;
            }

            const data = await genericDataMapper.createOne(entity, newDatas);
            if (data) {
                response.json({ data });
            }
        } catch (error) {
            next(error);
        }
    },

    async updateOne(request, response, next) {

        try {
            const { entity, id } = request.params;
            const updatedDatas = request.body;
            if (parseInt(id) == parseInt(updatedDatas.id)) {
                const data = await genericDataMapper.updateOne(entity, updatedDatas);
                if (data) {
                    response.json({ data })
                }
            } else {
                next()
            }

        } catch (error) {
            next(error)
        }
    },

    async deleteAll(request, response, next) {
        try {
            const { entity } = request.params;
            await genericDataMapper.deleteAll(entity);
            return 'Suppression effectuée'

        } catch (error) {
            next(error)

        }
    },

    async deleteOne(request, response, next) {
        try {
            const { entity, id } = request.params;
            await genericDataMapper.deleteOne(entity, id);
            return 'suppression effectuée'
        } catch (error) {
            next(error)
        }
    }
};

module.exports = genericController;