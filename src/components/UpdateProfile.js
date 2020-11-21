/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 05:00:13 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {
  // refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // methods from useAuth
  const { currentUser, updateEmail, updatePassword } = useAuth();
  // states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // set error (password mismatch)
      return setError("Passwords don't match");
    }

    const promises = [];

    // reset error
    setError("");
    // set loading to true
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (
      passwordRef.current.value &&
      passwordConfirmRef.current.value &&
      passwordRef.current.value === passwordConfirmRef.current.value
    ) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push({
          pathname: "/",
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {/* {currentUser && (
          <Alert variant="success">
            Logged in as <b>{currentUser.email}</b>
          </Alert>
        )} */}
          {error && (
            <Alert variant="danger">
              <strong>Failed Account Update:</strong> {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            {/* email */}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>
            {/* password */}
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep current password"
              ></Form.Control>
            </Form.Group>
            {/* password confirm */}
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep current password"
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
