import AuthPage from "@/components/auth-page/auth";
import Container from "@/components/ui/container";
import React from "react";

const Page = () => {
  return (
    <Container center className="h-screen bg-white-1">
      <AuthPage />
    </Container>
  );
};

export default Page;
