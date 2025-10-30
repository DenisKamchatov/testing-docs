export const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = './placeholder.png';
};

export const getImageSrc = (imageUrl: string | null | undefined): string => {
  if (!imageUrl || imageUrl.trim() === '') {
    return '/placeholder.png';
  }
  return imageUrl;
};