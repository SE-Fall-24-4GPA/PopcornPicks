'use client';

import React, { useState } from "react";
import { Input, Button, Card, CardHeader, CardBody, CardFooter, Link, Divider } from "@nextui-org/react";
import { Mail, Lock, LogIn } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Add your login API call here
        console.log('Form submitted:', formData);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Card className="max-w-md w-full px-4 py-6 shadow-xl">
      <CardHeader className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <p className="text-sm text-default-500 text-center">
          Please sign in to continue
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <Link href="#" size="sm" className="text-primary">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full mt-2"
            endContent={<LogIn size={18} />}
          >
            Sign In
          </Button>
        </form>
      </CardBody>
      
      <CardFooter className="flex justify-center">
        <p className="text-center text-sm text-default-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" size="sm" className="text-primary">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}