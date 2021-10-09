const faker = require('faker');
const { DateTime } = require('luxon');

exports.generateUserFeatures = (userId)=>{
  return [{
    user_feature_name:'admin_access',
    user_feature_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    user_feature_name:'send_email',
    user_feature_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    user_feature_name:'root_access',
    user_feature_description:'',
    created_by: userId,
    created_at: DateTime.now()
  }]
}

exports.generateStatuses = (userId)=>{
  return [{
    user_status_name:'active',
    user_status_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    user_status_name:'inactive',
    user_status_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    user_status_name:'draft',
    user_status_description:'',
    created_by: userId,
    created_at: DateTime.now()
  }]
}

exports.generateRoles = (userId)=>{
  return [ {
    user_role_name:'superadmin',
    user_role_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    user_role_name:'admin',
    user_role_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    user_role_name:'user',
    user_role_description:'',
    created_by: userId,
    created_at: DateTime.now()
  }]
}

exports.generateFilmakingRoles = (userId)=>{
  return [{
    filmaking_member_role_name:'actor',
    filmaking_member_role_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    filmaking_member_role_name:'director',
    filmaking_member_role_description:'',
    created_by: userId,
    created_at: DateTime.now()
  },
  {
    filmaking_member_role_name:'photographer',
    filmaking_member_role_description:'',
    created_by: userId,
    created_at: DateTime.now()
  }]
}

exports.generateCategories = (userId)=>{
  return [
    {
      category_name: 'horror',
      created_by: userId,
      created_at: DateTime.now()
    },
    {
      category_name: 'action',
      created_by: userId,
      created_at: DateTime.now()
    },
    {
      category_name: 'romance',
      created_by: userId,
      created_at: DateTime.now()
    },
  ]
}

exports.generateMovies = (userId)=>{
  let movies = [];
  for (let index = 0; index < 5; index++) {
    
    const newMovie = {
      movie_title: faker.lorem.words(),
      movie_rating: faker.datatype.number({ min: 0,max: 5 }),
      like_count: 0,
      movie_description: faker.lorem.paragraph(),
      movie_release_date: faker.date.past(),
      movie_url: faker.internet.url(),
      movie_thumbnail:  faker.image.imageUrl(),
      created_by: userId,
      created_at: DateTime.now()
    }

    movies.push(newMovie)
    
  }
  return movies
}

exports.generateFilmakingMembers = (userId)=>{
  let filmakingMembers = []
  
  for (let index = 0; index < 5; index++) {
    const newMember = {
      filmaking_member_first_name: faker.name.firstName(),
      filmaking_member_last_name: faker.name.lastName(),
      filmaking_member_birth_place: faker.address.city(),
      filmaking_member_birth_date: faker.date.past(),
      filmaking_member_thumbnail: faker.image.avatar(),
      filmaking_member_bio: faker.lorem.paragraphs(3),
      created_by: userId,
      created_at: DateTime.now()
    }

    filmakingMembers.push(newMember)
    
  }
}