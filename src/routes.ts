
import Elysia from "elysia";
import {authModule} from './modules/auth';
import {userModule} from './modules/user';
import {userRoleModule} from './modules/userRole';
import {userSessionModule} from './modules/userSession';
const routes = new Elysia()
.use(authModule)
.use(userModule)
.use(userRoleModule)
.use(userSessionModule);
export { routes };
