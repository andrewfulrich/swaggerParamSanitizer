# swaggerParamSanitizer

Params are passed in as strings in express, and this middleware converts them into the ints, booleans, etc. that they should be, as defined in the swagger doc.

Example usage:
```
const swagger = require('./my-swagger.json')
const sanitizer=require('swagger-param-sanitizer')(swagger)
const express = require('express')
const app = express()
app.post('/api/doSomething',sanitizer,(req,res)=>{
console.log('these should have the proper types now:')
console.log(req.params)
console.log(req.query)
console.log(req.body)
})
```
