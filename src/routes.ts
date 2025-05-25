
import Elysia from "elysia";
import {authModule} from './modules/auth';
import {debugModule} from './modules/debug';
import {userModule} from './modules/user';
import {userRoleModule} from './modules/userRole';
import {userSessionModule} from './modules/userSession';
const routes = new Elysia()
.use(authModule)
.use(debugModule)
.use(userModule)
.use(userRoleModule)
.use(userSessionModule);
export { routes };
