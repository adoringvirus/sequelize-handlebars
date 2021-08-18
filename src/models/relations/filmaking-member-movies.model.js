const Sequelize = require('sequelize');
const { FILMAKING_MEMBERS_AND_MOVIES_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersMoviesRelationModel = sequelize.define(FILMAKING_MEMBERS_AND_MOVIES_RELATION,{
  filmaking_member_id: {
    type: Sequelize.INTEGER,
  },
  movie_id: {
    type: Sequelize.INTEGER,
  }
},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true
})


module.exports = FilmakingMembersMoviesRelationModel;