import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import type { LoginType } from "@/types/auth";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import GoogleLoginButton from "./GoogleLoginButton";

export function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="eg: johndoe@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            onChange={handleChange}
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#8B5DFF] hover:bg-[#6A42C2]"
        >
          {loading ? <Loader className="animate-spin" /> : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <GoogleLoginButton />
    </form>
  );
}
