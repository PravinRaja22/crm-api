const item = require('../item.js')
//options for get all items

const getItemopts={
    schema:{
        Response:{
            200:{
                type:'array',
                item:{
                    type:'object',
                    properties:{
                       id:{type:'integer'},
                        name:{type:'string'}
                    }
                }
            }
        }
    }
}
console.log(getItemopts);
const getItemoptss= {
    schema:{
        Response:{
            200:{
                    type:'object',
                    properties:{
                        id:{type:'string'},
                       // name:{type:'string'}
                    }
                }
        }
    }
}

function itemRoutes(fastify,options,done){
//get all records
    fastify.get('/',getItemopts,(request,reply)=>{
          reply.send(item)
    })
//get id based items
    fastify.get('/:id',getItemoptss,(request, reply) => {
        try{
            const { id } = request.params;
        var paramid = item.find((paramdata) => paramdata.id == id)
        if (paramid) {
            reply.send(paramid)
    
        }
        else if (!paramid) {
            reply.send('No Records Found')
        } 
        }
        catch(e){
        fastify.log.error(e)
        process.exit(1)
        }
    })

    done();



}

module.exports = itemRoutes