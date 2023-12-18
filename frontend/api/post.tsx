import { Post, User } from "../types/interfaces";
const baseURL = process.env.SERVER_BASE_URL;
export async function getUserPost(uid: number) {
  try {
    const yourPostEndpoint = `${baseURL}/api/retrieveAllPostByUser/${uid}`;
    const response = await fetch(yourPostEndpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}

export async function getSavePost(uid: number) {
  try {
    const yourPostEndpoint = `${baseURL}/api/userLikedPosts/${uid}`;
    const response = await fetch(yourPostEndpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}
export async function getAllCat() {
  try {
    const allCat = `${baseURL}/api/getAllCat`;
    const response = await fetch(allCat);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}

export async function getPostbyCategory(userID: number, catID: number) {
  try {
    console.log("in postByCat api");
    const postCat = `${baseURL}/api/postByCat/${userID}/${catID}`;
    const response = await fetch(postCat);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}
export async function getUser(userID: number) {
  try {
    console.log("in postByCat api");
    const postCat = `${baseURL}/api/user/${userID}`;
    const response = await fetch(postCat);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}
