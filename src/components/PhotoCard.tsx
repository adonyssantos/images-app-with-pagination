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
import type { Photo } from "../models/rovers.service";
import { useState } from "react";

type PhotoCardProps = {
  photo: Photo;
  handleDelete: (id: number) => void;
};

export function PhotoCard({ photo, handleDelete }: PhotoCardProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
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
          <Button color="error" onClick={() => handleDelete(photo.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
