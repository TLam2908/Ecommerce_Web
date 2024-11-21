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
    price: string;
    quantity: string;
    oem_number: string;
    Category: Category;
    Manufacturer: Manufacturer;
    Images: {
        id: string; src: string 
}[];
    Autopart_Model: { Model: Model }[];
}

export interface Image {
    id: string;
    src: string;
}