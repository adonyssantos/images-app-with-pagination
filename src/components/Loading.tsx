import { Container, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Container sx={{ py: 4, textAlign: "center" }}>
      <CircularProgress />
    </Container>
  );
}
