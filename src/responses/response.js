const options = {
  status:200,
  data:'',
  path:"",
  version:'',
  code: '',
  message:'',
  title:''
}


exports.RESPONSES = {
  OK(
    /** @type {import('express').Response } */
    res,
    responseParameters = options
  ){
    const { data,path,code=200,version,message,title  } = responseParameters;
    return res.status(code).json({
      path,
      version,
      code,
      status: 'success',
      message,
      data
    })
  },
  BAD_REQUEST(
    /** @type {import('express').Response } */
    res,
    responseParameters
  ){
    const { path,code=400,version,message,error  } = responseParameters;
    return res.status(code).json({
      path,
      version,
      code,
      status: 'failed',
      message,
      data: null,
      error
    })
  },
  INTERNAL_ERROR(
    /** @type {import('express').Response } */
    res,
    responseParameters
  ){
    const { path,code=500,version,message,error  } = responseParameters;
    return res.status(code).json({
      path,
      version,
      code,
      status: 'failed',
      message,
      data: null,
      error
    })
  }
}