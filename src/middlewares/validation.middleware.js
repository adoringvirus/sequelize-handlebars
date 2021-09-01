const { RESPONSES } = require("../responses/response")

const isValidBody = (schema)=> async (req,res,next)=>{
  try {
    await schema.validate(req.body)
    next()
  } catch (error) {
    return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      message: 'Error with the body parameters',
      data: null,
      error:{
        message: error.message,
        params: error.params
      }
    })
  }
}

const isParamValid = (req,res,next)=>{
  const { params,originalUrl } = req;

  for (const paramKey in params) {
    if(isNaN(params[paramKey])){ return RESPONSES.BAD_REQUEST(res,{
      path: originalUrl,
      code: 400,
      message: `Parameter ${paramKey}  must be a number`,
    })}
  }
  return next();
}

module.exports = {
  isValidBody,
  isParamValid
}