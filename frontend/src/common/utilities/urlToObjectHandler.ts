export const urlToObject = async (url: string): Promise<File> => {
    const response = await fetch(url);
    
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', {type: blob.type});
    
    return file;
  }