import { Router } from 'express';
import { searchDynamic } from '../controllers/search.controller';
export const searchRoutes = Router();
searchRoutes.get('/:collection/:term', searchDynamic);
//# sourceMappingURL=search.routes.js.map