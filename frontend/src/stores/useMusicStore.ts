import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    currentAlbum: Album | null;
    currentSong: Song | null;
    personalizedSongs: Song[];
    featuredSongs: Song[];
    trendingSongs: Song[];
    isLoading: boolean;
    error: string | null;
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchSongs: () => Promise<void>;
    fetchSongsById: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    fetchPersonalizedSongs: () => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    currentAlbum: null,
    currentSong: null,
    personalizedSongs: [],
    featuredSongs: [],
    trendingSongs: [],
    isLoading: false,
    error: null,
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get("/albums");
            if (res.data) set({ albums: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/albums/${id}`);
            if (res.data) set({ currentAlbum: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        }finally {
            set({ isLoading: false });
        }
    },

    fetchSongs: async () => {
        set({isLoading: true, error: null});
        try {
            const res = await axiosInstance.get(`/songs`);
            if (res.data) set({songs: res.data});
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSongsById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/songs/${id}`);
            if (res.data) set({ currentSong: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);

            // update app state to reflect this deletion
            set((state) => ({
                // remove album from lcoal albums arr
                albums: state.albums.filter((album) => album._id !== id),

                // check for each song if it's linked to the deleted album, 
                    // if yes, set album field to null
                songs: state.songs.map((song) =>
                    song.albumId ===
                    state.albums.find((a) => a._id === id) ?. title
                        ? {...song, album: null }
                        : song
                ),
            }));
            toast.success("Successfully deleted album");
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            console.log("Error in deleteAlbum useMusicStore", error);
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteSong: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);
            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id)
            }));
            toast.success("Successfully deleted song");
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            console.log("Error in deleteSong useMusicStore", error);
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPersonalizedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get("/songs/personalised-songs");
            if (res.data) set({ personalizedSongs: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get("/songs/featured");
            if (res.data) set({ featuredSongs: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get("/songs/trending");
            if (res.data) set({ trendingSongs: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
		try {
			const res = await axiosInstance.get("/stats");
            if (res.data) set({ stats: res.data });
		} catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = (error as { message: string }).message;
            }
			set({ error: errorMessage });
		} finally {
			set({ isLoading: false });
		}
    },
}));