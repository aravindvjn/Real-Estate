import AuthPage from "@/components/auth-page/auth";
import Container from "@/components/ui/container";
import React from "react";

const Page = () => {
  return (
    <Container center className="h-screen from-green-1 to-blue-600 bg-gradient-to-br">
      <AuthPage />
    </Container>
  );
};

export default Page;
