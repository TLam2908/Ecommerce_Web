import { Router } from 'express';

import { getHomeAutoparts, getHomeAutopartById, getHomeBillboards, getHomeBillboardById, getAutopartsByCategory, getCategoryById, getManufacturers, getModels, getFilterAutoparts } from '../controllers/home.controller';

const homeRoutes = Router();    

// prefix: /home
homeRoutes.get("/homeBillboards", getHomeBillboards)
homeRoutes.get("/homeBillboard/:id", getHomeBillboardById)
homeRoutes.get("/homeAutoparts", getHomeAutoparts)
homeRoutes.get("/homeAutopart/:id", getHomeAutopartById)
homeRoutes.get("/relatedAutoparts/:id", getAutopartsByCategory)    

homeRoutes.get("/homeCategory/:id", getCategoryById)
homeRoutes.get("/homeManufacturers", getManufacturers)
homeRoutes.get("/homeModels", getModels)
homeRoutes.get("/homeAutopartsFilter", getFilterAutoparts)

export default homeRoutes
