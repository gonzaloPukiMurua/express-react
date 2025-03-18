import axios from "./axios"

export const uploadImage = async (file, productId) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await axios.post(`files/uploadImage/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response;
  };