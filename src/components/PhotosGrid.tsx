import { Photo } from "../models/rovers.service";
import { Button, Grid, Card, CardMedia, CardActions, Typography } from "@mui/material";

type PhotosGridProps = {
    photos: Photo[];
    handleDelete: (id: number) => void;
}

export function PhotosGrid({ photos, handleDelete }: PhotosGridProps) {
    return <Grid container spacing={3} justifyContent="center">
    {photos.map((photo) => (
      <Grid key={photo.id}>
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
}
