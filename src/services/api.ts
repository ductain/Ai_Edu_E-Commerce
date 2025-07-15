import axios from "axios";

const API_BASE_URL = "https://686fd09d4838f58d1122fce2.mockapi.io/api/v1/";

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}products`);
  return response.data;
};

export const updateProductFavorite = async (productId: string, isFavorite: boolean) => {
  const response = await axios.put(`${API_BASE_URL}products/${productId}`, { isFavorite });
  return response.data;
};

export const getFavoriteProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}products?isFavorite=true`);
  return response.data;
};

export const getHistoryProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}products?isClicked=true`);
  return response.data;
};

export const updateProductHistory = async (productId: string, isClicked: boolean) => {
  const response = await axios.put(`${API_BASE_URL}products/${productId}`, {
    isClicked,
    clickedTime: isClicked ? new Date().toISOString() : null,
  });
  return response.data;
};

// Get AI suggestions
export const getSuggestions = async (userId: string) => {
  const res = await axios.get(`${API_BASE_URL}suggestions?userId=${userId}`);
  const suggestion = res.data[0];
  if (!suggestion) return [];

  const products = await Promise.all(
    suggestion.productIds.map((id: string) =>
      axios.get(`${API_BASE_URL}products/${id}`).then((res) => res.data)
    )
  );

  return products;
};

// Chatbot API
export const sendChatMessage = async (userInput: string) => {
  const res = await axios.post('https://coh2-be.vercel.app/chat-shop', { userInput });
  return res.data;
};
