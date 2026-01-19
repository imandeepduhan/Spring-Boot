import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginData } from "../models/LoginData";
import { CheckCircle2Icon, Github, Mail } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { tr } from "date-fns/locale";
import { loginUser } from "@/services/AuthServices";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/store";
import OAuth2Buttons from "@/components/ui/OAuth2Buttons";


function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };
const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    //validation:
    if (loginData.email.trim() === "") {
      toast.error("Input required !");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Input required !");
      return;
    }

    //server call for login
    // console.log(event.target);
    // console.log(loginData);
      try {
      setLoading(true);
      // const userInfo = await loginUser(loginData);

      //login function : useAuth
      await login(loginData);
      toast.success("Login success");
      // console.log(userInfo);
      navigate("/dashboard");

      //save the current user logged in informations
      //localstorage
    } catch (error: any) {
      console.log(error);

      toast.error("Error !!");
      if (error?.status == 400) {
        setError(error);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="text-center space-y-2">
          {/* Logo */}
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white font-extrabold">
            A
          </div>

          <CardTitle className="text-2xl font-bold">
            Welcome back
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Login to access your futuristic authentication app
          </p>
            {error &&(
              <div className="mt-1">
              <Alert variant={"destructive"}>
                <CheckCircle2Icon/>
                <AlertTitle>{
                  error?.response ? error?.response?.data?.message: error?.message
                  }</AlertTitle>
              </Alert>
            </div>
            )}

        </CardHeader>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-white dark:bg-slate-800"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-white dark:bg-slate-800"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Login Button */}
          <Button disabled={loading}
           className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-black">
            {loading ?(<><Spinner /> Please wait...
            </> ): (
            "Login"
            )}
  
          </Button>

          {/* Divider */}
          <div className="relative text-center text-sm">
            <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400 relative z-10">
              OR
            </span>
            <div className="absolute inset-0 top-1/2 border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* OAuth Buttons */}
          <OAuth2Buttons />

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don’t have an account?{" "}
            <span className="text-cyan-500 hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
