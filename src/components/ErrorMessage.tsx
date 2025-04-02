import { Typography, Container } from "@mui/material";
import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Container sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography color="error" variant="h6">
        {children}
      </Typography>
    </Container>
  );
}
