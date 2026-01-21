import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// 🔴 IMPORT BOTH IMAGES
import monsterImg from "../assets/cseb.jpg";   // initial image
import normalImg from "../assets/pic3.jpeg";        // hover image

import "../styles/SignupHero.css";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    collegeMail: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔥 refs for hover reveal
  const heroRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const reveal = revealRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let visible = false;

    const animate = () => {
      x += (mouseX - x) * 0.08;
      y += (mouseY - y) * 0.08;

      reveal.style.setProperty("--x", `${x}px`);
      reveal.style.setProperty("--y", `${y}px`);

      requestAnimationFrame(animate);
    };

    animate();

    const move = (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (!visible) {
        visible = true;
        reveal.classList.add("active");
      }
    };

    const leave = () => {
      visible = false;
      reveal.classList.remove("active");
    };

    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", leave);

    return () => {
      hero.removeEventListener("mousemove", move);
      hero.removeEventListener("mouseleave", leave);
    };
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users`,
        form,
        { withCredentials: true }
      );
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  // Framer Motion Variants
  const cardVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 70, damping: 12 } 
    },
  };

  const formItemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 70, damping: 12 } 
    },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div
      className="signup-hero"
      ref={heroRef}
      style={{ backgroundImage: `url(${normalImg})` }}
    >
      {/* 🔥 MONSTER IMAGE REVEAL */}
      <div
        className="fire-reveal"
        ref={revealRef}
        style={{ backgroundImage: `url(${monsterImg})` }}
      ></div>

      {/* SIGNUP CARD */}
      <motion.div 
        className="signup-card"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="signup-title"
          variants={formItemVariant}
        >
          CREATE ACCOUNT
        </motion.h2>

        {error && (
          <motion.p 
            className="error-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        <motion.form 
          onSubmit={submitHandler} 
          className="signup-form"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.input
            variants={formItemVariant}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={changeHandler}
          />

          <motion.input
            variants={formItemVariant}
            type="email"
            name="collegeMail"
            placeholder="College Email"
            value={form.collegeMail}
            onChange={changeHandler}
          />

          <motion.input
            variants={formItemVariant}
            type="email"
            name="email"
            placeholder="Personal Email"
            value={form.email}
            onChange={changeHandler}
          />

          <motion.input
            variants={formItemVariant}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={changeHandler}
          />

          <motion.select
            variants={formItemVariant}
            name="role"
            value={form.role}
            onChange={changeHandler}
          >
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </motion.select>

          <motion.button 
            variants={formItemVariant}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </motion.form>

        <motion.div
          variants={formItemVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <Link to="/login" className="login-link">
            Already have an account? Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

