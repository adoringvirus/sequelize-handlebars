const { Router } = require('express');
const V1RootRouter = Router();

V1RootRouter.use( require('./user-status.routes') );
V1RootRouter.use( require('./user-roles.routes') );
V1RootRouter.use( require('./user-features.routes') );
V1RootRouter.use( require('./category.routes') ),
V1RootRouter.use( require('./reviews.routes') );
V1RootRouter.use( require('./comments.routes') );
V1RootRouter.use( require('./like.routes') );
V1RootRouter.use( require('./filmaking-members.routes') );
V1RootRouter.use( require('./filmaking-members-roles.routes') );
V1RootRouter.use( require('./user.routes') );
V1RootRouter.use( require('./movie.routes') );


module.exports = V1RootRouter