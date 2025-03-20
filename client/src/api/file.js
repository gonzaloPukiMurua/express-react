import axios from "./axios"

export const uploadImage = async (file, productId) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("Imagen enviada:", formData.get("file"));

    const response = await axios.post(`files/uploadImage/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response;
  };