this.app.get('/api/docs',(req,res)=>{
      
  function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      console.log('%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }
  
  // this.app._router.stack.forEach(print.bind(null, []))
  // console.log(`RootRouter`)
  // return res.json({message:'wiii'})
  const rute = this.app._router.stack
  rute.map((middleware)=>{
    if(middleware.route){
      // console.log(`middleware`, middleware)
      // * server level routes
      console.log(`\nserver level routes \n`)
      console.log(`path:`,middleware.route.path) //* Get the path
      console.log(`method:`,middleware.route.methods) //* get params
      console.log(`*********`)
    }

    //* if it does have nested routes keep going
    if(middleware.handle.stack){
      middleware.handle.stack.map((routerMiddleware)=>{
        if(routerMiddleware.route){
          console.log(`path:`,routerMiddleware.route.path) //* Get the path
          console.log(`method:`,routerMiddleware.route.methods) //* get params
        }
        // * check if it is a router middleware
        if(routerMiddleware.handle.name === 'router' && routerMiddleware.handle.stack){
          console.log(`nested routes`, routerMiddleware)
          // console.log(`*********`)
          // console.log(`path:`,routerMiddleware.handle.stack[0].route.path) //* Get the path
          // console.log(`method:`,routerMiddleware.handle.stack[0].route.stack[0].method) //* get params
          // console.log(`*********`)

          routerMiddleware.handle.stack.map(nestedRouterMiddleware=>{
            if(nestedRouterMiddleware.route){
              console.log(`path: `, nestedRouterMiddleware.route.path)
              console.log(`methods: `, nestedRouterMiddleware.route.methods)
            }
            if(nestedRouterMiddleware.handle.name === 'router' && nestedRouterMiddleware.handle.stack){
              nestedRouterMiddleware.handle.stack.map(___layer=>{
                // console.log(`___layer`, ___layer)
              })
            }
          })
        }
      })
      // if(layer.handle.stack[0].route){
      //   console.log(`layer.name`, layer.handle.stack.route)
      // }
    }
  })
  // console.log(`rute`,rute)
  return res.json({message:'wiii',rute})
})