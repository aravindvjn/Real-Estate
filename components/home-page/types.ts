import { ReactNode } from "react"

//Description Type 
export type DescriptionCellProps = {
    children: ReactNode;
    heading: string;
    subheading: string;
}

//FindPropertiesByCities Props
export type FindPropertiesCellProps = {
    city: string;
    image_url?: string;
    no_properties?: number;
} 