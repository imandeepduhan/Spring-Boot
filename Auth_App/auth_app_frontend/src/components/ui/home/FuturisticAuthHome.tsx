import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  Lock,
  Zap,
  Users,
  Fingerprint,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FuturisticAuthHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold tracking-tight"
          >
            Secure Authentication,
            <span className="block text-cyan-500 dark:text-cyan-400">
              Reimagined for the Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            A modern, scalable, developer-friendly authentication platform
            with JWT, OAuth, and enterprise-grade security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-black"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-600"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />}
            title="Enterprise Security"
            desc="JWT, refresh tokens, encryption, and role-based access control."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />}
            title="Social Login"
            desc="Google, GitHub and OAuth 2.0 integrations."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />}
            title="High Performance"
            desc="Low-latency APIs designed for scale."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-100 dark:bg-slate-900 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={<Fingerprint className="h-7 w-7 text-cyan-500 dark:text-cyan-400" />}
              title="Authenticate"
              desc="Users sign in using email, password or social providers."
            />
            <StepCard
              icon={<Lock className="h-7 w-7 text-cyan-500 dark:text-cyan-400" />}
              title="Authorize"
              desc="JWT and refresh tokens manage secure sessions."
            />
            <StepCard
              icon={<ShieldCheck className="h-7 w-7 text-cyan-500 dark:text-cyan-400" />}
              title="Protect"
              desc="APIs stay protected with middleware and role checks."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-28 text-center">
        <h2 className="text-4xl font-bold">
          Ready to Secure Your Application?
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Launch with a production-ready authentication system today.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-black"
          >
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-6 text-center text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} AuthX. All rights reserved.
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-600 dark:text-slate-400">
        {desc}
      </CardContent>
    </Card>
  );
}

function StepCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}
