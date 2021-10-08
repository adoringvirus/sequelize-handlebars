exports.generateUserFeatures = (userId)=>{
  return [{
    user_feature_name:'admin_access',
    user_feature_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    user_feature_name:'send_email',
    user_feature_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    user_feature_name:'root_access',
    user_feature_description:'',
    created_by: userId,
    created_at: Date.now()
  }]
}

exports.generateStatuses = (userId)=>{
  return [{
    user_status_name:'active',
    user_status_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    user_status_name:'inactive',
    user_status_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    user_status_name:'draft',
    user_status_description:'',
    created_by: userId,
    created_at: Date.now()
  }]
}

exports.generateRoles = (userId)=>{
  return [ {
    user_role_name:'superadmin',
    user_role_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    user_role_name:'admin',
    user_role_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    user_role_name:'user',
    user_role_description:'',
    created_by: userId,
    created_at: Date.now()
  }]
}

exports.generateFilmakingRoles = (userId)=>{
  return [{
    filmaking_member_role_name:'actor',
    filmaking_member_role_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    filmaking_member_role_name:'director',
    filmaking_member_role_description:'',
    created_by: userId,
    created_at: Date.now()
  },
  {
    filmaking_member_role_name:'photographer',
    filmaking_member_role_description:'',
    created_by: userId,
    created_at: Date.now()
  }]
}