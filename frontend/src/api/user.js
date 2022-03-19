import { URL_API } from "./../utils/constants";

export const LoginApi = async (formValue) => {
  try {
    const url = `${URL_API}/api/user/sign-in`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };
    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("usuario o password incorrectos");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUsersApi = async (token) => {
  try {
    const url = `${URL_API}/api/users`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {}
};

export const addUserApi = async (data) => {
  try {
    const url = `${URL_API}/api/users/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUserApi = async (id, data, token) => {
  try {
    const url = `${URL_API}/api/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {}
};

export const deleteUserApi = async (id, token) => {
  try {
    const url = `${URL_API}/api/users/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const filterUsersMalePendingApi = async () => {
  try {
    const url = `${URL_API}/api/users/users-filtered`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
