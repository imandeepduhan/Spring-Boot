import React, { use } from "react";
import { Button } from "./button";
import { NavLink, useNavigate } from "react-router";
import useAuth from "@/auth/store";

function Navbar() {

    const checkLogin = useAuth((state) => state.checkLogin);
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();
    return (
        <nav className="
  flex md:flex-row flex-col items-center justify-between
  h-auto md:h-14 gap-4 md:gap-0 px-6 py-5 md:py-0
  bg-white/80 dark:bg-slate-950/80
  backdrop-blur-md
  border-b border-slate-200 dark:border-slate-800
">

            <div className="flex items-center gap-2 font-semibold">
                <span className="
                     flex h-7 w-7 items-center justify-center
                     rounded-md
                    bg-gradient-to-br from-cyan-500 to-blue-600
                    text-sm font-bold text-white
                     ">
                    A
                </span>
                <span className="text-base tracking-tight">
                    Auth<span className="text-cyan-500 dark:text-cyan-400">App</span>
                </span>
            </div>

            <div className="flex gap-4 items-center">
                {
                    checkLogin() ? (
                        <>   <NavLink to={"/dashboard/profile"}>{user?.name}</NavLink>

                            <Button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                                size={"sm"}
                                className="cursor-pointer"
                                variant={"outline"}
                            >
                                Logout
                            </Button>

                        </>
                    ) : (<>  <NavLink to={"/"}>
                        Home
                    </NavLink>
                        <NavLink to={'/login'}>
                            <Button size={"sm"} className="cursor pointer" variant={"outline"}>
                                Login</Button>
                        </NavLink>
                        <NavLink to={'/signup'}>
                            <Button size={"sm"} className="cursor pointer" variant={"outline"}>
                                Signup</Button>
                        </NavLink></>
                    )}
            </div>
        </nav>
    )
}

export default Navbar;