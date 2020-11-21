/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 04:22:16 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  // refs
  const emailRef = useRef();
  // methods from useAuth
  const { resetPassword } = useAuth();
  // states
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // reset mesasge
      setMessage("");
      // reset error
      setError("");
      // set loading to true
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      // set error (failed account creation)
      setError(error.message);
      //   console.error(error);
    }

    // set loading to true
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && (
            <Alert variant="danger">
              <strong>Failed Password Reset:</strong> {error}
            </Alert>
          )}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Registered Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              Reset Password
            </Button>
          </Form>

          <div className="w-100 text-center mt-4">
            <Link to="/signin">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
