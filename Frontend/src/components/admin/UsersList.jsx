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
        const response = await fetch("https://tema-diplomes-travel-app-api.vercel.app/api/users");
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
        `https://tema-diplomes-travel-app-api.vercel.app/users/${userId}/role`,
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

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error("Failed to update user role:", error.message);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleEditClick = (user) => {
    setIsEditModalOpen(true);
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
          <h2>Paneli i përdoruesit</h2>
        </div>
        <div className="admin-table">
          <div className="flex users-list user-title">
            <span>Username</span>
            <span>Roli</span>
            <span>Veprimet</span>
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
            <h3>Ndrysho</h3>
            <Select
              id="mySelect"
              options={[
                { value: "1", label: "përdoruesi" },
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
            <p>Jeni i sigurt që dëshironi ta fshini këtë përdorues? </p>
            <button type="submit" className="delete-button admin-submit-btn">
              Po
            </button>
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="delete-button"
            >
              Jo
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UsersList;
