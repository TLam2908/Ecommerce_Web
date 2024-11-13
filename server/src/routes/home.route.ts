import { Router } from 'express';

import { getHomeAutoparts, getHomeAutopartById, getHomeBillboards, getHomeBillboardById } from '../controllers/home.controller';
import { getBillboardHandler } from '../controllers/billboard.controller';

const homeRoutes = Router();    

// prefix: /home
homeRoutes.get("/homeBillboards", getHomeBillboards)
homeRoutes.get("/homeBillboard/:id", getHomeBillboardById)
homeRoutes.get("/homeAutoparts", getHomeAutoparts)
homeRoutes.get("/homeAutopart/:id", getHomeAutopartById)

export default homeRoutes
