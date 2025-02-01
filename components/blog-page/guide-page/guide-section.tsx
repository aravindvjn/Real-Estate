import React from "react";
import { realEstateGuides } from "./guides";
import CenterHeader from "@/components/ui/center-header";
import GridCell from "@/components/member-page/join-page/grid-cell";

const GuideSection = () => {
  return (
    <div>
      {realEstateGuides.map((guide, index) => (
        <div
          id={guide.heading.toLocaleLowerCase().replace(" ", "_")}
          key={index}
        >
          <CenterHeader heading={guide.heading} subheading={guide.subheading} />
          <div className="grid md:grid-cols-2 p-5 gap-5 md:px-10 lg:px-14">
            {guide.guides.map((item, i) => (
              <GridCell
                key={i}
                image_className="object-cover h-[200px] sm:h-[300px] md:h-[400px]"
                {...item}
                link={`/blog/guide/${item.id}`}
                button_text="Read More"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuideSection;
