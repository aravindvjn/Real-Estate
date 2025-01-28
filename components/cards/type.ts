export type CardProps = {
    title: string;
    location: string;
    rate: number;
    detail?: {
        bedrooms: number;
        bathrooms: number;
        garage: number;
        size: number;
        price: number;
        features: string[];
    }
}