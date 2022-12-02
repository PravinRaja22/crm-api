const Accouninsertschema = {
    schema: {
        body: {
            type: 'object',
            required: ['annualRevenue','type'],
            properties: {
                accountName:{ type: 'string' },
                accountNumber:{ type: 'number' },
                annualRevenue:{ type: 'number' },
                rating: { type: 'string' },
                type: { type: 'string' },
            }
        },
    }
}

module.exports = {Accouninsertschema}