import "./App.css";
import "./styles/login.css";
import "./styles/modal.css";
import "./styles/main.css";
import "./styles/admin.css";
import "./styles/wishlist.css";
import "./styles/booking.css";
import "./styles/notifications.css";
import Homepage from "./components/Homepage";
import "./styles/components.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/login/LoginRegister";
import AdminDashboard from "./components/admin/AdminDashboard";
import Wishlist from "./components/user/Wishlist";
import PopularPlaces from "./components/PopularPlaces";
import Bookings from "./components/user/Bookings";
import { SocketProvider } from "./SocketsContext";
import SearchResults from "./components/SearchResults";
import { SearchProvider } from "./SearchContext";

function App() {
  return (
    <SearchProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login-register" element={<LoginRegister />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/places" element={<PopularPlaces />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Routes>
        </Router>
      </SocketProvider>
    </SearchProvider>
  );
}

export default App;
