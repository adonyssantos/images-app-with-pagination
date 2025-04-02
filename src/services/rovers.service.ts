import type { Photo, PhotosResponse } from "../models/rovers.service";
import { BaseService } from "./base.service";

type PhotosListener = (photos: Photo[]) => void;

/**
 * @class RoversService
 * @extends {BaseService}
 * @description
 * The `RoversService` class provides methods to fetch and manage photos from NASA's Mars Rover API.
 * It supports subscription-based updates for real-time photo changes and pagination for easy photo browsing.
 */
export class RoversService extends BaseService {
    private photos: Photo[] | null = null;
    private listeners: Set<PhotosListener> = new Set();

    constructor() {
        super();
        // Initial request to fetch all the photos and save on a local variable
        this.init();
    }

    private async init() {
        const response = await this.fetchApi<PhotosResponse>(
            `/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=${import.meta.env.VITE_API_KEY}`
        );
        this.photos = response.photos;
        this.notifyListeners();
    }

    /**
     * Subscribes a listener to be notified whenever photos are updated.
     * 
     * @param {PhotosListener} listener - The listener function to be notified of photo updates.
     * @returns {() => void} - A function to unsubscribe the listener.
     */
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

    /**
     * Retrieves a paginated subset of photos based on the specified page number and page size.
     * 
     * @param {number} page - The page number to retrieve.
     * @param {number} [pageSize=12] - The number of photos per page.
     * @returns {Photo[] | null} - An array of photos or null if no photos are available.
     */
    public getPhotos(page: number, pageSize: number = 12) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return this.photos?.slice(startIndex, endIndex);
    }

    /**
     * Calculates the total number of pages based on the number of photos and the page size.
     * 
     * @param {number} [pageSize=12] - The number of photos per page.
     * @returns {number} - The total number of pages.
     */
    public getTotalPages(pageSize: number = 12) {
        return Math.ceil(this.photos?.length ?? 0 / pageSize);
    }

    /**
     * Removes a photo from the list of photos.
     * 
     * @param {number} id - The ID of the photo to remove.
     */
    public removePhoto(id: number) {
        this.photos = this.photos?.filter((photo) => photo.id !== id) ?? null;
        this.notifyListeners();
    }
}
