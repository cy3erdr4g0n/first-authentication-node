const { ApolloServer } = require('apollo-server')
const express = require('express')

const app = express()

const mongoose = require('mongoose')

require('dotenv').config()

const PORT  = process.env.PORT || 3000
// database 
const URL = process.env.MONGO_URL

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server =new ApolloServer({
    typeDefs,
    resolvers
})


mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology: true}).then(()=>{

    console.log(`database connected`)
    return server.listen({port : PORT})

}).then((res)=>{

    console.log(`server runing at ${res.url}`)

})



app.listen(PORT,(req,res)=>{

    console.log(`server Started at ${PORT}`)
    
})