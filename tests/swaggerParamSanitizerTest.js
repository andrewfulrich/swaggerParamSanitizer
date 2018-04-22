const tape=require('tape')
const swagger=require('../test_files/swagger.json')
const swaggerParamSanitizer=require('../sanitizer')(swagger)

tape('get the correct data types back from a request',t=>{
  t.plan(4)

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

tape('get the defaults back from a request missing params with defaults',t=>{
  t.plan(3)

  let req={
    params:{},
    body:{},
    query:{
      isAscOrder:'false'
    },
    method:'get',
    url:'http://localhost/api/testNode0',
    host:'http://localhost'
  }
  let next=()=>{
    t.equal(req.params.limit,10,'limit should equal the integer 0')
    t.equal(req.params.offset,0,'offset should equal the integer 0')
    t.equal(req.params.orderBy,'id','orderBy should equal the string "id"')
  }
  swaggerParamSanitizer(req,{},next)
})

tape('get the defaults back from a request missing params with defaults',t=>{
  t.plan(4)

  let req={
    params:{},
    body:{},
    query:{
      isAscOrder:false
    },
    method:'get',
    url:'http://localhost/api/testNode0',
    host:'http://localhost'
  }
  let next=()=>{
    t.equal(req.params.limit,10,'limit should equal the integer 10')
    t.equal(req.params.offset,0,'offset should equal the integer 0')
    t.equal(req.params.orderBy,'id','orderBy should equal the string "id"')
    t.equal(req.query.isAscOrder,false,'isAscOrder should equal the boolean FALSE')
  }
  swaggerParamSanitizer(req,{},next)
})

tape('get undefined params when params are undefined with no default',t=>{
  t.plan(3)

  let req={
    params:{},
    body:{},
    query:{
      isAscOrder:'false'
    },
    method:'get',
    url:'http://localhost/api/testNode0',
    host:'http://localhost'
  }
  let next=()=>{
    t.equal(req.query.id,undefined,'id should be undefined in the request query')
    t.equal(req.params.id,undefined,'id should be undefined in the request params')
    t.equal(req.body.id,undefined,'id should be undefined in the request body')
  }
  swaggerParamSanitizer(req,{},next)
})