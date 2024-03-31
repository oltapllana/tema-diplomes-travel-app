import React, { useState, useEffect } from "react";
import Edit from "./../../assets/admin/Edit";
import Delete from "../../assets/admin/Delete";
import Modal from "./../Modal";
import Select from "react-select";
import { deleteUser } from "../../api/users";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userIdd, setUserIdd] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ newRole }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      console.log("User role updated successfully");
    } catch (error) {
      console.error("Error updating user role:", error.message);
      throw error;
    }
  };

  // Example usage to update user role
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      // Perform role update request
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error("Failed to update user role:", error.message);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleEditClick = (user) => {
    setIsEditModalOpen(true);
    console.log(user);
    setUserInfo(user);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleSubmit = (e) => {
    handleUpdateUserRole(userInfo?.userId, selectedOption.label);
  };
  const handleDeleteClick = (id) => {
    setIsDeleteOpen(true);
    setUserIdd(id);
  };

  const handleDelete = async () => {
    const response = await deleteUser(userIdd);
    if (response.error) {
      return;
    }
    setIsDeleteOpen(false);
  };
  return (
    <>
      <div className="user-dashboard">
        <div className="user-list-header">
          <h2>User Dashboard</h2>
          <button>Add user</button>
        </div>
        <div className="admin-table">
          <div className="flex users-list user-title">
            <span>Username</span>
            <span>Role</span>
            <span>Actions</span>
          </div>
          {users.map((user) => (
            <div className="flex users-list" key={user._id}>
              <span> {user.username}</span>
              <span> {user.role}</span>
              <div className="user-actions">
                <div onClick={() => handleEditClick(user)}>
                  <Edit />
                </div>
                <div onClick={() => handleDeleteClick(user.userId)}>
                  <Delete />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isEditModalOpen && (
        <Modal
          isDisplay={isEditModalOpen}
          setIsDisplay={setIsEditModalOpen}
          className="edit-wrapper"
        >
          <form onSubmit={handleSubmit}>
            <h3>Edit</h3>
            <Select
              id="mySelect"
              options={[
                { value: "1", label: "user" },
                { value: "2", label: "admin" },
              ]}
              value={selectedOption}
              onChange={handleSelectChange}
            />
            <button type="submit" className="admin-submit-btn">
              Change role
            </button>
          </form>
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal
          isDisplay={isEditModalOpen}
          setIsDisplay={setIsEditModalOpen}
          className="edit-wrapper"
        >
          <form onSubmit={handleDelete}>
            <p>Are you sure you want to delete this user? </p> 
            <button type="submit" className="delete-button admin-submit-btn">
              Yes
            </button>
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="delete-button"
            >
              No
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UsersList;
