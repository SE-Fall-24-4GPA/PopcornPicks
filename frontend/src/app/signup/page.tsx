"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Divider,
} from "@nextui-org/react";
import { Mail, Lock, User, LogIn } from "lucide-react";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Add your signup API call here
        console.log("Form submitted:", formData);
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Card className="max-w-md w-full px-4 py-6 shadow-xl">
      <CardHeader className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Sign Up!</h1>
        <p className="text-sm text-secondary">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errorMessage={errors.name}
            isInvalid={!!errors.name}
            placeholder="Enter your name"
            labelPlacement="outside"
            startContent={
              <User
                className="text-default-400 pointer-events-none flex-shrink-0"
                size={18}
              />
            }
          />
          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            isInvalid={!!errors.email}
            placeholder="Enter your email"
            labelPlacement="outside"
            startContent={
              <Mail className="text-default-400 pointer-events-none flex-shrink-0" size={18} />
            }
          />
          <Input
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
            isInvalid={!!errors.password}
            placeholder="Enter your password"
            labelPlacement="outside"
            startContent={
              <Lock className="text-default-400 pointer-events-none flex-shrink-0" size={18} />
            }
          />
          <Input
            type="password"
            label="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            errorMessage={errors.confirmPassword}
            isInvalid={!!errors.confirmPassword}
            placeholder="Re-enter your password"
            labelPlacement="outside"
            startContent={
              <Lock className="text-default-400 pointer-events-none flex-shrink-0" size={18} />
            }
          />
          <Button type="submit"
          color="primary"
          className="w-full mt-2"
          endContent={<LogIn size={18}/>} >
            Sign Up
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
