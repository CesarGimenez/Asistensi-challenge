import { useState } from "react";
import {
  addUserApi,
  deleteUserApi,
  getUsersApi,
  updateUserApi,
  filterUsersMalePendingApi,
} from "../api/user";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi();
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addUser = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const filterUsersMalePending = async () => {
    try {
      setLoading(true);
      const usersfiltered = await filterUsersMalePendingApi();
      setUsers(usersfiltered);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    filterUsersMalePending,
    loading,
    error,
    users,
  };
};
