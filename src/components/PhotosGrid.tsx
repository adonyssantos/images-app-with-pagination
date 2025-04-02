import { Photo } from "../models/rovers.model";
import { Grid } from "@mui/material";
import { PhotoCard } from "./PhotoCard";

type PhotosGridProps = {
  photos: Photo[];
  handleDelete: (id: number) => void;
};

export function PhotosGrid({ photos, handleDelete }: PhotosGridProps) {
  return (
    <Grid container spacing={3} justifyContent="center">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} handleDelete={handleDelete} />
      ))}
    </Grid>
  );
}
