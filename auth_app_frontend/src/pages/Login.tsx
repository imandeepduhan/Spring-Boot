import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail } from "lucide-react";
import React from "react";

 function Login() {
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
            Sign in to continue to your account
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-white dark:bg-slate-800"
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
            />
          </div>

          {/* Login Button */}
          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
            Login
          </Button>

          {/* Divider */}
          <div className="relative text-center text-sm">
            <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400 relative z-10">
              OR
            </span>
            <div className="absolute inset-0 top-1/2 border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don’t have an account?{" "}
            <span className="text-cyan-500 hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
