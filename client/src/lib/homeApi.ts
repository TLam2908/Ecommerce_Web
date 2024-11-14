import { HOME_API } from "@/config/apiClient";

export const getBillboards = async () => HOME_API.get("/home/homeBillboards")
export const getBillBoardById = async (id: string) => HOME_API.get(`/home/homeBillboard/${id}`)

export const getAutoparts = async () => HOME_API.get('/home/homeAutoparts')
export const getAutopartById = async (id: string) => HOME_API.get(`/home/homeAutopart/${id}`)
export const getRelatedAutoparts = async (id: string) => HOME_API.get(`/home/relatedAutoparts/${id}`)

export const getCategoryById = async (id: string) => HOME_API.get(`/home/homeCategory/${id}`)
export const getManufacturers = async () => HOME_API.get('/home/homeManufacturers') 
export const getModels = async () => HOME_API.get('/home/homeModels')       
