export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const [startUrl, endUrl] = src.split("/upload/");
  return `${startUrl}/upload/w_${width},q_${quality ?? 75}/${endUrl}`;
};