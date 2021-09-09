const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersMoviesRelationModel = sequelize.define(
  'filmaking_members_and_movies_relation',{
  filmaking_member_id: DataTypes.INTEGER,
  movie_id: DataTypes.INTEGER,
},{
  timestamps: false,
  freezeTableName: true
})


module.exports = FilmakingMembersMoviesRelationModel;