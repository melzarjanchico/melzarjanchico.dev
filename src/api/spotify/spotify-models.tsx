import type { Track } from "../objects"

export interface SpotityMainServiceResponse {
    status: string,
    data: unknown,
    message: string,
    type?: string,
    date: Date
}

export interface SpotifyMainServiceErrorResponse {
    error: {
        status: number,
        message: string
    }
}

export interface CurrentTrackSuccessResponse {
    currently_playing_type: string,
    is_playing: boolean,
    progress_ms: number | null,
    timestamp: number,
    item: Track | null
}

export interface TopTracksSuccessResponse {
    href: string,
    items: Track[],
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number
}

// Public Models
export interface SpotityMainPublicServiceResponse<T> {
    status: number,
    data: T,
    message: string,
    type?: string,
    date: string
}
