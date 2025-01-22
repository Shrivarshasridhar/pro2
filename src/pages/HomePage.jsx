import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container text-center">
        <h1 className="display-4 fw-bold text-primary">Welcome to Keyframe Editor</h1>
        <p className="lead text-secondary">
          Create animations effortlessly with our easy-to-use, real-time editor.
        </p>
        <Link to="/editor" className="btn btn-lg btn-primary shadow-sm me-3">
          Get Started
        </Link>
        <Link to="/help" className="btn btn-lg btn-outline-primary shadow-sm">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
