import { Container, Typography } from "@mui/material";
import { ReactNode } from "react";

export function InfoMessage({ children }: { children: ReactNode }) {
  return (
    <Container sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h6">{children}</Typography>
    </Container>
  );
}
