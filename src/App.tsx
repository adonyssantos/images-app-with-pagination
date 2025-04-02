import { Button, Container, CircularProgress } from "@mui/material";
import { useRovers } from "./hooks/useRovers";
import { Loading } from "./components/Loading";
import { ErrorMessage } from "./components/ErrorMessage";
import { InfoMessage } from "./components/InfoMessage";
import { Title } from "./components/Title";
import { PhotosGrid } from "./components/PhotosGrid";

function App() {
  const { photos, isLoading, error, handleLoadMore, handleDelete, hasMorePhotos } = useRovers();
  
  // Render loading state
  if (isLoading && photos.length === 0) return <Loading />;

  // Render error state
  if (error) return <ErrorMessage>Error: {error.message}</ErrorMessage>;

  // Render empty state
  if (!photos.length) return <InfoMessage>No photos available</InfoMessage>;

  // Render photos, if successful
  return (
    <Container sx={{ py: 4 }}>
      <Title textAlign='center'>Mars Rover Photos</Title>

      <PhotosGrid photos={photos} handleDelete={handleDelete} />

      {hasMorePhotos && (
        <Button
          variant="contained"
          onClick={handleLoadMore}
          sx={{ mt: 4, display: "block", mx: "auto" }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "More Images"}
        </Button>
      )}
    </Container>
  );
}

export default App;
