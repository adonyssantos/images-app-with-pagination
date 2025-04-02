import { Button, Grid, Container, Card, CardMedia, CardActions, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { RoversService } from "./services/rovers.service";
import type { Photo } from "./models/rovers.service";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roversService] = useState(() => new RoversService());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const unsubscribe = roversService.subscribe(() => {
      const currentPhotos = [];
      for (let i = 1; i <= currentPage; i++) {
        const pagePhotos = roversService.getPhotos(i) || [];
        currentPhotos.push(...pagePhotos);
      }
      setPhotos(currentPhotos);
    });
    roversService.onError((requestError) => {
      setError(requestError);
    });
    roversService.onLoading((requestLoading) => {
      setIsLoading(requestLoading);
    });
    return () => {
      unsubscribe();
    };
  }, [roversService, currentPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleDelete = (id: number) => {
    roversService.removePhoto(id);
  };

  const hasMorePhotos = currentPage < roversService.getTotalPages();

  if (isLoading && photos.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!photos.length) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">No photos available</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Mars Rover Photos
      </Typography>

      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid item key={photo.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                sx={{
                  height: 300,
                  width: 300,
                  objectFit: "cover",
                }}
                image={photo.img_src}
                alt={`Mars Rover Photo ${photo.id}`}
              />
              <CardActions sx={{ mt: "auto" }}>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>
                  ID: {photo.id}
                  <br />
                  Camera: {photo.camera.name}
                  <br />
                  Earth Date: {photo.earth_date}
                  <br />
                  Rover: {photo.rover.name}
                </Typography>
                <Button size="small" color="error" onClick={() => handleDelete(photo.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
