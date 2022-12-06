const fastify = require('fastify')()

fastify.register(require('@fastify/mongodb'), {
  forceClose: true,
  url: 'mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority'
})



fastify.get('/user', function (req, reply) {
    // Or 
    const users = this.mongo.client.db('CRM').collection('Account')
  
    // if the id is an ObjectId format, you need to create a new ObjectId
    //const id = this.mongo.ObjectId(req.params.id)
    users.find({  }, (err, user) => {
      if (err) {
        reply.send(err)
        return
      }
      reply.send(user)
    })
  })
  
  fastify.listen({ port: 45000 }, err => {
    if (err) throw err
    console.log("connected to port")
  })