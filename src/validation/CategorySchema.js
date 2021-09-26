const Yup = require('yup');

const CategorySchema = (_update=false)=>{
  const categoryYupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    category_name: categoryYupObject,
    category_description: Yup.string()
  })
}

module.exports = CategorySchema