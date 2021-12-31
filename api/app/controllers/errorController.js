const errorController = {
    async error404(_, response) {
        if (!response.locals.notFound) {
            response.locals.notFound = `route`;
        }
        response.status(404).json({
            error: {
                code: 404,
                type: `not found`,
                message: `${response.locals.notFound} not found`
            }
        });
    },
    async error500(error, _, response, __) {
        console.error(error);
        response.status(500).json({
            error: {
                code: 500,
                type: `fatal error`,
                details: error
            }
        });
    },

};

module.export = errorController;