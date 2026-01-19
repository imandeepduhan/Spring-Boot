import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Github } from "lucide-react";
import { NavLink } from "react-router";

function OAuth2Buttons() {
  return (
    <div className="space-y-3">
      {/* OAuth Buttons */}
      <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8084"
      }/oauth2/authorization/google`} className={"block"}>
        <Button
        type="button"
        variant="outline"
        className="w-full flex cursor-pointer items-center gap-2"
      >
        <Mail className="h-4 w-4" />
        Continue with Google
      </Button>
      </NavLink>

     <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8084"
      }/oauth2/authorization/github`} className={"block"}>
         <Button
         type="button"
        variant="outline"
        className="w-full flex cursor-pointer items-center gap-2"
      >
        <Github className="h-4 w-4" />
        Continue with GitHub
      </Button>
     </NavLink>
    </div>
  );
}

export default OAuth2Buttons;
