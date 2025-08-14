import React from "react";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios";

function GoogleLoginButton() {
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

  const handleLoginSuccess = (response: any) => {
    const token = response.credential;
    axiosInstance
      .post("/auth/google", { token })
      .then((res) => {
        console.log("User data:", res.data);
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };

  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
}

export default GoogleLoginButton;
