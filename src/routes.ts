
import Elysia from "elysia";
import {userSessionModule} from './modules/userSession';
import {userRoleModule} from './modules/userRole';
import {debugModule} from './modules/debug';
import {userModule} from './modules/user';
import {authModule} from './modules/auth';
const routes = new Elysia()
.use(userSessionModule)
.use(userRoleModule)
.use(debugModule)
.use(userModule)
.use(authModule);
export { routes };
