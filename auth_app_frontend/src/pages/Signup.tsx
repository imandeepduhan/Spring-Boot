import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { da } from "date-fns/locale";
import { Github, Mail, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthServices";
import { useNavigate } from "react-router";

function Signup() {

  const [data,setData]=useState({
    name:'',
    email:'',
    password:"",
  });

 
  const [loading, setLoading] = useState<boolean>(false);
  const [error,setError]=useState(null);

  const navigate = useNavigate();

   // txt input , email , password, number, textarea
   // handling form change
  const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>) => {
  //  console.log(event.target.name);
   // console.log(event.target.value);
    setData((value)=>({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  // handling form submit:
  const handleFormSubmit= async (event:React.FormEvent)=>{
    event.preventDefault();
    console.log(data);

    // validations
    if(data.name.trim() === "") {
      toast.error("Name is required!");
      return;
    }

    if(data.email.trim() === "") {
      toast.error("Email is required!");
      return;
    }

    if(data.password.trim() === "") {
      toast.error("Password is required!");
      return;
    }

    //form submit for registrations
    try{

      const result = await registerUser(data);
      console.log(result);
      toast.success("User register successfully...");
      setData({
          name:'',
          email:'',
          password:"",
      });
      // navigate login page
      navigate("/login");

    }catch(error){

      console.log(error);
      toast.error("Error in registering the user...");

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
            Create your account
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Get started with secure authentication
          </p>
        </CardHeader>

        
        <form onSubmit={handleFormSubmit} className="space-y-6">

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="bg-white dark:bg-slate-800"
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-white dark:bg-slate-800"
              name="email"
              value={data.email}
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
              value={data.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Signup Button */}
          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
            Create Account
          </Button>

          {/* Divider */}
          <div className="relative text-center text-sm">
            <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400 relative z-10">
              OR
            </span>
            <div className="absolute inset-0 top-1/2 border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* OAuth */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Continue with Google
            </Button>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <Github className="h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <span className="text-cyan-500 hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
    
}

export default Signup;