const { MongoClient } = require('mongodb');
async function getDashboardData(object, field) {
    console.log(object)
    console.log(field)
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, object, field)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getDatas(client, object, field) {
    console.log(field)
    const myArray = field.split(",");
    let groupFields = [];
    console.log(myArray)
    myArray.forEach(e => {
        groupFields.push(e)
    })
    // let pipeline =([

    //     {
    //         $group: {
    //             _id:{
    //                 "Field1": `$${field}`,
    //                 "Fiel2":"$type",
    //                 "Field3":"$leadSource"
    //             },
    //             count:{$sum:1}
    //         },
    //     },
    //     { 
    //         $sort: { 
    //             count: -1
    //         } 
    //     },
    // ])

    // let pitpline2 = ([
    //     {
    //     $project: {
    //         groupField: {
    //           $filter: {
    //             input: `$${newArray}`,
    //             as: 'element',
    //             cond: { $in: ['$$element', `$${newArray}`] }
    //           }
    //         }
    //       }
    //     },
    //     {
    //       $group: {
    //         _id: '$groupField',
    //         count: { $sum: 1 }
    //       },

    //     }
    // ])

    const groupStage = {
        $group: {
            _id: {
                $arrayToObject: {
                    $zip: {
                        inputs: [
                            groupFields,
                            groupFields.map((field) => '$' + field),
                        ],
                    },
                },
            },
            count: { $sum: 1 }
            // Add other aggregation operators as needed
        },
    };
    const cursor = await client.db(process.env.DB).collection(object).aggregate([groupStage]).toArray()
    cursor.forEach((variable) => {
        console.log(variable)
        for (let key in variable._id) {
            if (variable._id.hasOwnProperty(key) && variable._id[key] === "") {
                variable._id[key]= null
            }
            console.log(variable._id)
        }
    });
    return cursor
}
module.exports = {
    getDashboardData
}
