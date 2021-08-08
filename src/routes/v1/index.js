const { Router } = require('express');
const CategoryRouter = require('./category.routes');
const CommentsRouter = require('./comments.routes');
const FilmakingMembersRolesRouter = require('./filmaking-members-roles.routes');
const FilmakingMembersRouter = require('./filmaking-members.routes');
const LikeRoutes = require('./like.routes');
const MoviesRouter = require('./movie.routes');
const ReviewsRouter = require('./reviews.routes');
const UserFeaturesRouter = require('./user-features.routes');
const UserRolesRouter = require('./user-roles.routes');
const UserStatusRouter = require('./user-status.routes');
const UserRouter = require('./user.routes');

const V1RootRouter = Router();

V1RootRouter.get('/',(req,res)=>{
  res.json({
    checking:'hellooo'
  })
})

V1RootRouter.use(UserStatusRouter);
V1RootRouter.use(UserRolesRouter);
V1RootRouter.use(UserFeaturesRouter);
V1RootRouter.use(CategoryRouter),
V1RootRouter.use(ReviewsRouter);
V1RootRouter.use(CommentsRouter);
V1RootRouter.use(LikeRoutes);
V1RootRouter.use(FilmakingMembersRouter);
V1RootRouter.use(FilmakingMembersRolesRouter);
V1RootRouter.use(UserRouter);
V1RootRouter.use(MoviesRouter);


module.exports = V1RootRouter