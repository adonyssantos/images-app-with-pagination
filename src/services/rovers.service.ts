import type { Photo, PhotosResponse } from "../models/rovers.service";
import { BaseService } from "./base.service";

type PhotosListener = (photos: Photo[]) => void;

export class RoversService extends BaseService {
    private photos: Photo[] | null = null;
    private listeners: Set<PhotosListener> = new Set();

    constructor() {
        super();
        this.init();
    }

    private async init() {
        const response = await this.fetchApi<PhotosResponse>(
            `/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=${import.meta.env.VITE_API_KEY}`
        );
        this.photos = response.photos;
        this.notifyListeners();
    }

    public subscribe(listener: PhotosListener) {
        this.listeners.add(listener);
        if (this.photos) {
            listener(this.photos);
        }
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notifyListeners() {
        if (this.photos) {
            this.listeners.forEach(listener => listener(this.photos!));
        }
    }

    public getPhotos(page: number, pageSize: number = 12) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return this.photos?.slice(startIndex, endIndex);
    }

    public getTotalPages(pageSize: number = 12) {
        return Math.ceil(this.photos?.length ?? 0 / pageSize);
    }

    public getTotalPhotos() {
        return this.photos?.length ?? 0;
    }

    public removePhoto(id: number) {
        this.photos = this.photos?.filter((photo) => photo.id !== id) ?? null;
        this.notifyListeners();
    }
}
