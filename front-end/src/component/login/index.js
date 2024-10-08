import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api/users';

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const remembered = localStorage.getItem('isRemembered');

    setEmail(storedEmail);
    setIsRemembered(remembered);
  }, []);

  const handleIsRemembered = (e) => {
    const isRemembereChecked = e.target.checked;
    setIsRemembered(isRemembereChecked);

    if (isRemembereChecked) {
      localStorage.setItem('isRemembered', isRemembereChecked); // Store isRemembered
    } else {
      localStorage.removeItem('isRemembered'); // Clear isRemembered
      localStorage.removeItem('email');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log('Login attempted with:', { email, password });
      if (isRemembered) {
        localStorage.setItem('email', email); // Store user ID
      } else {
        localStorage.removeItem('email'); // Clear stored ID
      }

      // Here you would typically send a request to your server
      try {
        const userData = await login(email, password);
        console.log('Login successful:', userData);
        navigate('/welcome', { state: { email: email } });
      } catch (error) {
        setErrors({ form: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" checked={isRemembered} onChange={handleIsRemembered} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
