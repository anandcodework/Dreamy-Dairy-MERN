const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "product");

    // Log the URL to verify
    console.log('Upload URL:', url);

    try {
        const dataResponse = await fetch(url, {
            method: "post",
            body: formData,
        });

        if (!dataResponse.ok) {
            const errorResponse = await dataResponse.json();
            console.error('Upload failed:', errorResponse);
            throw new Error('Upload failed');
        }

        return dataResponse.json();
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

export default uploadImage;
