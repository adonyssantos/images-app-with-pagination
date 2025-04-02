import { Photo } from "../models/rovers.service";
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";

type PhotosGridProps = {
  photos: Photo[];
  handleDelete: (id: number) => void;
};

export function PhotosGrid({ photos, handleDelete }: PhotosGridProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={3} justifyContent="center">
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
              <Button size="small" color="error" onClick={() => setOpen(true)}>
                Delete
              </Button>
            </CardActions>
          </Card>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Photo</DialogTitle>
            <DialogContent>
              <DialogContentText>Are you sure you want to delete this photo?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleDelete(photo.id)}>Delete</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ))}
    </Grid>
  );
}
