import { useEffect, useState } from "react";
import { RoversService } from "../services/rovers.service";
import type { Photo } from "../models/rovers.model";

export function useRovers() {
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

  return { photos, isLoading, error, handleLoadMore, handleDelete, hasMorePhotos };
}
