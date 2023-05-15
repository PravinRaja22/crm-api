const swaggerObject = {
    routePrefix:"/documentation",
    expostRoute:true,
    swagger: {
        info: {
            title: 'CloudDesk CRM',
            description: 'Clouddesk CRM Swagger',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
       
}

