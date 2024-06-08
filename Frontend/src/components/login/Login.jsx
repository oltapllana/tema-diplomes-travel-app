import React, { useState } from "react";
import { loginUser } from "../../api/users";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../redux/user/action";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData.username, formData.password);
    if (response.error) {
      setMessage(response.error);
      return;
    }
    if (response.message) {
    }
    dispatch(setUserRole(response.role));
    localStorage.setItem("role", response.role);
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("username", response.username);
    localStorage.setItem("id", response.id);

    if (response.role === "user") {
      navigate("/");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      {message && <p className="red-error">{message}. Ju lutem regjistrohuni!</p>}
      <button type="submit">Kycu</button>
    </form>
  );
}
