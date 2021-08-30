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

module.exports = isValidBody