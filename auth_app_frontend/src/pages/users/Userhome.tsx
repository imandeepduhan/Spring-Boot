import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Users,
  Activity,
  KeyRound,
} from "lucide-react";
import { getCurrentUser } from "@/services/AuthServices";
import useAuth from "@/auth/store";
import type UserT from "@/models/User";
import toast from "react-hot-toast";

function Userhome() {
  const user = useAuth((state) => state.user);
  const [user1, setUser1] = useState<UserT | null>(null);

  const getUserData = async () => {
    try {
      const user1 = await getCurrentUser(user?.email);
      setUser1(user1);
      toast.success("You are able to access secured apis")
    } catch (error) {
      console.log(error);
      toast.error("Error in getting data");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Overview of your authentication system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h2 className="text-2xl font-bold">1,248</h2>
            </div>
            <Users className="h-6 w-6 text-cyan-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <h2 className="text-2xl font-bold">312</h2>
            </div>
            <Activity className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Auth Requests</p>
              <h2 className="text-2xl font-bold">8,430</h2>
            </div>
            <KeyRound className="h-6 w-6 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Security Status</p>
              <h2 className="text-2xl font-bold text-emerald-500">
                Healthy
              </h2>
            </div>
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• User john@example.com logged in</p>
            <p>• New user registered via Google</p>
            <p>• API key regenerated</p>
            <p>• Password updated successfully</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Plan" value="Free Tier" />
            <Row label="Auth Type" value="JWT + OAuth" />
            <Row label="Last Login" value="2 hours ago" />
            <Row label="Region" value="Asia (IN)" />
          </CardContent>
        </Card>
      </div>

      {/* 👉 GET CURRENT USER (NOW AT BOTTOM) */}
      <div className="pt-6 border-t flex flex-col items-center gap-3">
        <Button
          onClick={getUserData}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          Get Current User
        </Button>
        <p>{user1?.name}</p>

        {user1 && (
          <p className="text-sm text-muted-foreground">
            Logged in as:{" "}
            <span className="font-medium">{user1.name}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default Userhome;
