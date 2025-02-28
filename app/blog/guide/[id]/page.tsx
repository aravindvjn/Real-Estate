import DetailedGuide from "@/components/blog-page/guide-page/detailed-guide/detailed-page";
import { realEstateGuides } from "@/components/blog-page/guide-page/guides";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  //extract id from params and get guide.
  const {id} = await params;
  
  if (!id) {
    notFound();
  }

  const result = realEstateGuides
    .flatMap((guide) => guide.guides)
    .find((item) => item.id === Number(id));

  if (!result) {
    notFound();
  }

  return (
    <div>
      <DetailedGuide 
      {...result} />
    </div>
  );
};

export default Page;
