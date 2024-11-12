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