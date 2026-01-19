import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import useAuth from "@/auth/store";
import { useState } from "react";

function Userprofile() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAuth((state) => state.user);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center
          text-slate-900 dark:text-slate-100"
      >
        User Profile
      </motion.h1>

      {/* Profile Card */}
      <Card
        className="rounded-2xl p-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-sm hover:shadow-md transition"
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28 border-2 border-primary/40 shadow-md">
              <AvatarImage src={user?.image || "https://api.dicebear.com/7.x/thumbs/svg?seed=user"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user?.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>

            <Button
              variant="outline"
              className="rounded-xl px-5
              border-slate-300 dark:border-slate-700
              hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Change Picture
            </Button>
          </div>

          {/* User Details */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/** Name */}
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400">
                  Full Name
                </Label>
                <Input
                  value={user?.name}
                  readOnly
                  className="rounded-xl bg-slate-50 dark:bg-slate-800"
                />
              </div>

              {/** Email */}
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400">
                  Email
                </Label>
                <Input
                  value={user?.email}
                  readOnly
                  className="rounded-xl bg-slate-50 dark:bg-slate-800"
                />
              </div>

              {/** Provider */}
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400">
                  Provider
                </Label>
                <Input
                  value={user?.provider}
                  readOnly
                  className="rounded-xl bg-slate-50 dark:bg-slate-800"
                />
              </div>

              {/** Enabled */}
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400">
                  Enabled
                </Label>
                <Input
                  value={user?.enabled ? "Yes" : "No"}
                  readOnly
                  className="rounded-xl bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={user?.name}
                  className="rounded-xl
                  bg-white dark:bg-slate-900
                  border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={user?.email}
                  readOnly
                  className="rounded-xl bg-slate-100 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2">
                <Label>Provider</Label>
                <Input
                  value={user?.provider}
                  readOnly
                  className="rounded-xl bg-slate-100 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2">
                <Label>Enabled</Label>
                <Input
                  value={user?.enabled ? "Yes" : "No"}
                  readOnly
                  className="rounded-xl bg-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full rounded-2xl mt-4 text-lg
              bg-primary hover:bg-primary/90"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="rounded-2xl w-full"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-2xl w-full bg-primary hover:bg-primary/90"
              >
                Save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card
        className="rounded-2xl p-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800"
      >
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-100">
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full rounded-xl py-3
            hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Change Password
          </Button>

          <Button
            variant="destructive"
            className="w-full rounded-xl py-3"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Userprofile;
