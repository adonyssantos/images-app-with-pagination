export abstract class BaseService {
  protected readonly baseUrl: string;
  private errorListeners: Set<(error: Error) => void> = new Set();
  private loadingListeners: Set<(isLoading: boolean) => void> = new Set();

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

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

  public onError(listener: (error: Error) => void) {
    this.errorListeners.add(listener);
    return () => {
      this.errorListeners.delete(listener);
    };
  }

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
