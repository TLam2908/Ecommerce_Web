export interface Billboard {
    id: string;
    title: string;
    image_src: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    code: string;
    billboard: Billboard;
}

export interface Manufacturer {
    id: string;
    name: string;
    description: string;
    code: string;
}

export interface Model {
    id: string;
    name: string;
    year: string;
    make: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: string
    oem_number: string;
    Category: Category;
    manufacturer: Manufacturer;
    Images: { src: string }[];
    Models: Model[];
}