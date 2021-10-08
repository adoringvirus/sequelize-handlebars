const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersMoviesRelationModel = sequelize.define(
  'filmaking_members_and_movies_relation',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  filmaking_member_id:{
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  movie_id: {
    type:DataTypes.INTEGER,
    primaryKey: true
  },
},{
  timestamps: false,
  freezeTableName: true
})


module.exports = FilmakingMembersMoviesRelationModel;