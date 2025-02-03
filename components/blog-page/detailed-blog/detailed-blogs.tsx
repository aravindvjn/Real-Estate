import React from "react";
import { BlogTypes } from "../guide-page/type";

import DetailedGuide from "../guide-page/detailed-guide/detailed-page";
import Link from "next/link";

const Detailedblog = ({
  content,
  created_at,
  thumbnail,
  first_name,
  last_name,
  id,
  title,
  user_id,
}: BlogTypes) => {
  return (
    <div className="bg-white-1 min-h-dvh">
      <DetailedGuide
        description={""}
        details={content}
        image={thumbnail}
        title={title}
        link={""}
        id={Number(id)}
      >
        <div className="py-3 text-[12px] sm:text-[14px]">
          <Link href={`/users/${user_id}`}>
            Author : {first_name} {last_name}
          </Link>
          <p>
            Published : {new Date(created_at).toLocaleString()}
          </p>
        </div>
      </DetailedGuide>
    </div>
  );
};

export default Detailedblog;
