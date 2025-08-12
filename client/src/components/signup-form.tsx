import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { type SignupType } from "@/types/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SignupForm() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupType>({
    username: "",
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
      signup(formData);
      toast.success("Account created successfully!");
      navigate("/login");
      setFormData({ username: "", email: "", password: "" });
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
        <h1 className="text-2xl font-bold">Sign up for an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={handleChange}
            value={formData.username}
            id="username"
            name="username"
            type="text"
            placeholder="eg: John Doe"
            required
          />
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={handleChange}
            value={formData.email}
            id="email"
            name="email"
            type="email"
            placeholder="eg: johndoe@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={handleChange}
            value={formData.password}
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
          {loading ? <Loader2 /> : "Sign Up"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Log In
        </Link>
      </div>
    </form>
  );
}
