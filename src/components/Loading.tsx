import { Container, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Container sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Container>
  );
}
