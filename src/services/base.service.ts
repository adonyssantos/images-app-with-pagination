/**
 * @abstract
 * @class BaseService
 * @description
 * BaseService is an abstract class providing foundational functionality for making API requests and handling global loading and error states.
 */
export abstract class BaseService {
  protected readonly baseUrl: string;
  private errorListeners: Set<(error: Error) => void> = new Set();
  private loadingListeners: Set<(isLoading: boolean) => void> = new Set();

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  /**
   * Makes an API request to the specified endpoint and returns the parsed response as a generic type.
   * Handles loading state notification and error handling.
   * 
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint to call (relative to the base URL).
   * @param {RequestInit} [options] - Optional fetch configuration options.
   * @returns {Promise<T>} - The parsed response data.
   * @throws {Error} - Throws an error if the request fails.
   * @protected
   */
  protected async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      this.notifyLoadingListeners(true);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.notifyLoadingListeners(false);
      return data;
    } catch (error) {
      this.notifyLoadingListeners(false);
      if (error instanceof Error) {
        this.handleError(error);
      } else {
        this.handleError(new Error("Unknown error occurred"));
      }
    }
  }

  protected handleError(error: Error): never {
    console.error("API Error:", error);
    this.notifyErrorListeners(error);
    throw error;
  }

  /**
   * Adds an error listener to the service.
   * 
   * @param {Function} listener - The listener function to be called when an error occurs.
   * @returns {Function} - A function to remove the listener.
   */
  public onError(listener: (error: Error) => void) {
    this.errorListeners.add(listener);
    return () => {
      this.errorListeners.delete(listener);
    };
  }

  /**
   * Adds a loading listener to the service.
   * 
   * @param {Function} listener - The listener function to be called when the loading state changes.
   * @returns {Function} - A function to remove the listener.
   */
  public onLoading(listener: (isLoading: boolean) => void) {
    this.loadingListeners.add(listener);
    return () => {
      this.loadingListeners.delete(listener);
    };
  }

  private notifyErrorListeners(error: Error) {
    this.errorListeners.forEach((listener) => listener(error));
  }

  private notifyLoadingListeners(isLoading: boolean) {
    this.loadingListeners.forEach((listener) => listener(isLoading));
  }
}
