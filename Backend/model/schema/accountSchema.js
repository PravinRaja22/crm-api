const Accouninsertschema = {
    schema: {
        body: {
            type: 'object',
            required: ['type'],
            properties: {
                accountName:{ type: 'string' },
                accountNumber:{ type: 'number' },
                rating: { type: 'string' },
                type: { type: 'string' },
            }
        },
    }
}
const dataloaderAccountinsertschema = {
    schema: {
        body: {
            type: 'object',
            required: ['type'],
            properties: {
                accountName:{ type: 'string' },
                accountNumber:{ type: 'number' },
                rating: { type: 'string' },
                type: { type: 'string' },
            }
        },
    }
}
module.exports = {Accouninsertschema,dataloaderAccountinsertschema}