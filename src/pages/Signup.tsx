import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="container mx-auto py-16">
      <SEO title="Create Account — SignAI" description="Join SignAI to translate ISL and explore semantic pose search." />
      <div className="max-w-md mx-auto rounded-xl border bg-card p-6 md:p-8">
        <h1 className="font-display text-2xl mb-6">Create your account</h1>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Alex Johnson" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={show ? 'text' : 'password'} placeholder="Create a strong password" required />
              <button type="button" aria-label="Toggle password visibility" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShow(v => !v)}>
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          <Button className="w-full" variant="hero" type="submit">Sign up</Button>
        </form>
        <div className="my-6 text-center text-sm text-muted-foreground">or continue with</div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline"><Mail className="mr-2" /> Google</Button>
          <Button variant="outline"><Github className="mr-2" /> GitHub</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
