import React, { Suspense } from "react";
import { PropertyTypes } from "../cards/type";
import ImageSlideShow from "./image-slide-show";
import OwnerDetails from "./owner-data";
import BannerImage from "./banner-image";
import PropertyDetails from "./property-details";
import FeatureSection from "./feature-section";
import ContactAgent from "./contact-agent";

type DetailedPageProps = {
  property: PropertyTypes;
};

const DetailedPage = ({ property }: DetailedPageProps) => {
  let additionalFeatures = [];

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
        />
        <div className="px-5 md:px-10 pb-5 text-sm md:text-lg">
          <PropertyDetails {...property} />
          <FeatureSection
            features={[...additionalFeatures, ...property.features]}
          />
          <Suspense fallback={<p>Loading...</p>}>
            <OwnerDetails owner_id={property.owner_id!} />
          </Suspense>
          <p className="text-lg md:text-xl font-bold py-2">Gallery</p>
          <ImageSlideShow image_urls={property.image_urls} />
          <ContactAgent />
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;
