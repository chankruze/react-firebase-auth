/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 02:24:31 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signin = () => {
  // refs
  const emailRef = useRef();
  const passwordRef = useRef();
  // methods from useAuth
  const { signin } = useAuth();
  // states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // reset error
      setError("");
      // set loading to true
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push({
        pathname: "/",
      });
    } catch (error) {
      // set error (failed account creation)
      setError(error.message);
      // console.error(error);
    }

    // set loading to true
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {/* {currentUser && (
            <Alert variant="success">
              Logged in as <b>{currentUser.email}</b>
            </Alert>
          )} */}
          {error && (
            <Alert variant="danger">
              <strong>Failed login:</strong> {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              Sign In
            </Button>
          </Form>

          <div className="w-100 text-center mt-4">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Signin;
