import React, { Suspense } from "react";
import { PropertyTypes } from "../cards/type";
import ImageSlideShow from "./image-slide-show";
import OwnerDetails from "./owner-data";
import BannerImage from "./banner-image";
import PropertyDetails from "./property-details";
import FeatureSection from "./feature-section";

type DetailedPageProps = {
  property: PropertyTypes;
};

const DetailedPage = ({ property }: DetailedPageProps) => {
  const additionalFeatures = [];

  if (property.bathrooms > 0) {
    additionalFeatures.push(property.bathrooms + " Bathrooms");
  }
  if (property.garage > 0) {
    additionalFeatures.push(property.garage + " Garage");
  }
  if (property.bedrooms > 0) {
    additionalFeatures.push(property.bedrooms + " Bedrooms");
  }

  return (
    <div className="w-full p-3 md:p-5 bg-[#e1e1e1]">
      <div className="rounded overflow-hidden shadow-md md:rounded-lg bg-white">
        <BannerImage
          image={property.image_urls[0]}
          price={property.price}
          title={property.title}
          type={property.type}
        />
        <div className="px-5 md:px-10 pb-5 text-sm md:text-[16px]">
        <p className="sm:text-right translate-y-3 text-[12px] italic sm:text-[14px]">Published on {new Date(property.created_at).toDateString()}</p>
          <PropertyDetails {...property} />
          <FeatureSection
            features={[...additionalFeatures, ...property.features]}
          />
          <p className="text-lg md:text-xl font-bold py-2">Gallery</p>
          <ImageSlideShow image_urls={property.image_urls} />
          <Suspense fallback={<p>Loading...</p>}>
            <OwnerDetails owner_id={property.owner_id!} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;
