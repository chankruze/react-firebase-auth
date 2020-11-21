/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 02:23:07 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push({
        pathname: "/signin",
      });
    } catch (error) {
      setError(`Failed to log out`);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-4">
            Update profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          logout
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
