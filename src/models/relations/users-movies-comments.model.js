const Sequelize = require('sequelize');
const { USERS_MOVIES_COMMENTS_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const UserMovieCommentsRelation = sequelize.define(USERS_MOVIES_COMMENTS_RELATION,{
  users_id: {
    type: Sequelize.UUID,
  },
  movies_id: {
    type: Sequelize.UUID,
  },
  comments_id: {
    type: Sequelize.UUID,
  }
},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true,
  underscored: true,
})


module.exports = UserMovieCommentsRelation;