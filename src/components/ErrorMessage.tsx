import { Typography, Container } from "@mui/material";
import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Container sx={{ py: 4, textAlign: "center" }}>
      <Typography color="error" variant="h6">
        {children}
      </Typography>
    </Container>
  );
}
