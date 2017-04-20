const tape=require('tape')
const swagger=require('../test_files/swagger.json')
const swaggerParamSanitizer=require('../sanitizer')(swagger)


tape('get the correct data types back from a request',t=>{
  t.plan(4)
  let path='/api/testNode0'
  let req={
    params:{},
    body:{},
    query:{
      limit:'0',
      offset:'2',
      orderBy:'testEdge1',
      isAscOrder:'false'
    },
    method:'get',
    url:'http://localhost/api/testNode0',
    host:'http://localhost'
  }
  let next=()=>{
    t.equal(req.query.limit,0,'limit should equal the integer 0')
    t.equal(req.query.offset,2,'offset should equal the integer 2')
    t.equal(req.query.orderBy,'testEdge1','orderBy should equal the string "testEdge1"')
    t.equal(req.query.isAscOrder,false,'isAscOrder should equal the boolean FALSE')
  }
  swaggerParamSanitizer(req,{},next)
})