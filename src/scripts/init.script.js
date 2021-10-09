const UserService = require('../services/user.service');
const sequelize = require('../database/database');
const { getRole,getStatus } = require('../services/util.service');
const { createManyEntities } = require('../services/base.service');
const { generateFilmakingRoles,generateRoles,generateStatuses,generateUserFeatures, generateMovies, generateFilmakingMembers, generateCategories } = require('./dataGeneration.script');


const UserStatusModel = require('../models/user-status/user-status.model');
const UserRolesModel = require('../models/user-roles/user-roles.model');
const FilmakingMembersRolesModel = require('../models/filmaking-member-roles/filmaking-members-roles.model');
const UserFeaturesModel = require('../models/user-features/user-features.model');
const MovieModel = require('../models/movie/movie.model');
const FilmakingMemberModel = require('../models/filmaking-members/filmaking-members.model');
const CategoryModel = require('../models/category/category.model');

module.exports = async (userInfo)=>{
  sequelize.bootstrap().sync()
  const user = await UserService.createOneUser({
    user_username:   userInfo.user_username || 'super_admin',
    user_first_name: userInfo.user_first_name || 'admin',
    user_last_name: userInfo.user_last_name || 'Administrator',
    user_phone:  userInfo.user_phone || '',
    user_email: userInfo.user_email || 'admin@gmail.com',
    user_password: userInfo.user_password || '1@3Ad@4S%gF#^S@',
    user_verified: true,
    user_blocked: false, 
    user_avatar:   '',
    user_verify_token: null,
    user_last_login_at: null,
    user_last_ip_address: null,
    role_id: null,
    status_id: null,
  })
  
  if(user){
    // * Statuses creation
    await createManyEntities(UserStatusModel,generateStatuses(user.id));

    // * Roles creation 
    await createManyEntities(UserRolesModel,generateRoles(user.id));

    // * UserFeatures
    await createManyEntities(UserFeaturesModel,generateUserFeatures(user.id));

    // * Movies
    await createManyEntities(MovieModel,generateMovies(user.id));

    // * Categories 
    await createManyEntities(CategoryModel,generateCategories(user.id));

    // * Filmaking member
    await createManyEntities(FilmakingMemberModel,generateFilmakingMembers(user.id));

    // * Filmaking member role
    await createManyEntities(FilmakingMembersRolesModel,generateFilmakingRoles(user.id));
    
    const _status = await getStatus('active')
    const _role = await getRole('superadmin')
    
    // * Assigning status and role to user
    const updatedUser = await user.update({
      role_id: _role.id,
      status_id: _status.id,
    })

    
  }


}