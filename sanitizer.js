/**
 Swagger Param Sanitizer

 Takes in raw string params from requests and parses them into the correct types according to the swagger doc

 Author: Andrew Ulrich

 MIT License

 Copyright (c) 2017 Andrew F. Ulrich

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

const swaggerParamParser = require('swagger-param-parser')
module.exports= function makeSanitizer(swagger) {
  return (req, res, next) => {
    var swaggerParams = swaggerParamParser.getSwaggerParams(req, swagger)
    var paramsSchema = swaggerParamParser.swaggerParamsToSchema(swaggerParams)
    var params = Object.assign(req.params, req.body, req.query)
    try {
      Object.keys(paramsSchema.properties).forEach((paramName) => {
        if (params[paramName] == undefined) {
          return
        }
        switch (paramsSchema.properties[paramName].type) {
          case 'number':
            params[paramName] = params[paramName] == '' ? undefined : parseFloat(params[paramName])
            break;
          case 'integer':
            params[paramName] = params[paramName] == '' ? undefined : parseInt(params[paramName])
            break;
          case 'boolean':
            params[paramName] = params[paramName] == '' ? undefined : Boolean(params[paramName])
            break;
        }
        if (req.params[paramName] != undefined) {
          req.params[paramName] = params[paramName]
        }
        if (req.body[paramName] != undefined) {
          req.body[paramName] = params[paramName]
        }
        if (req.query[paramName] != undefined) {
          req.query[paramName] = params[paramName]
        }
      })
      next()
    } catch (e) { //if there's a problem parsing the int/float/etc., then it's invalid input
      res.status(422).json(e.message)
    }
  }
}