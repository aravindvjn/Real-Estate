export type CardProps = {
    title: string;
    location: string;
    rate: number;
    image_urls?: string[]
    detail?: {
        bedrooms: number;
        bathrooms: number;
        garage: number;
        size: number;
        price: number;
        features: string[];
    }
}

export type PropertyTypes = {
    id: string,
    title: string,
    location: string,
    rate: string,
    bedrooms: number,
    image_urls: string[],
    bathrooms: number,
    garage: number,
    size: string,
    price: string,
    features: string[],
    created_at: string;
    updated_at: string;
    owner_id: string;
    description: string;
    type: 'rent' | 'sale'
}