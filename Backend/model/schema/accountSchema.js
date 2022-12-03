const Accouninsertschema = {
    schema: {
        body: {
            type: 'object',
            required: ['type'],
            properties: {
                accountName:{ type: 'string' },
                accountNumber:{ type: 'number' },
               // annualRevenue:{ type: 'currency' },
                rating: { type: 'string' },
                type: { type: 'string' },
            }
        },
    }
}

module.exports = {Accouninsertschema}