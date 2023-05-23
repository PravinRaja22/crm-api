const Accouninsertschema = {
    schema: {
        body: {
            type: 'object',
            required: ['type'],
            properties: {
                accountName:{ type: 'string' },
                accountNumber:{ type: 'string' },
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
                phone:{type:'number'}
            }
        },
    }
}
console.error("inside validataion function ")
module.exports = {Accouninsertschema}