

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables');
  }
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  export const API_ENDPOINTS = {
    connect: `${API_BASE_URL}/connect`,
    // Add other endpoints here
    users: `${API_BASE_URL}/users`,
    addUser: `${API_BASE_URL}/api/addUser`,
  };
  