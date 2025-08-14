import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";

function GoogleLoginButton() {
  const { googleLogin } = useAuth();
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleLoginSuccess,
    });
    const signInButton = document.getElementById("google-signin-button");
    if (signInButton) {
      window.google.accounts.id.renderButton(signInButton, {
        theme: "outline",
        size: "large",
      });
    } else {
      console.error("Google sign-in button element not found!");
    }
  }, []);

  const handleLoginSuccess = async (response: any) => {
    try {
      const token = response.credential;
      await googleLogin(token);
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
}

export default GoogleLoginButton;
