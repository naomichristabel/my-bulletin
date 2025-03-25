const API_URL =  process.env.REACT_APP_API_URL;

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  return response.json();
};

export const deletePost = async (id) => {
  await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
};
