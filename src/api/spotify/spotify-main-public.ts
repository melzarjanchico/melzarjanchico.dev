import type { CurrentTrackSuccessResponse, SpotityMainPublicServiceResponse, TopTracksSuccessResponse } from "./spotify-models";
import type { User } from "../objects";
import axios, { AxiosError } from "axios";

export class SpotifyMainPublicService {
    static API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/spotify`;

    static async getUser() {
        const url = `${this.API_URL}/user`;

        console.log(url)
        
        try {
            const response = await axios.get<SpotityMainPublicServiceResponse<User>>(url);
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return ({
                    status: 500,
                    data: error,
                    message: "Something went wrong with the axios requst.",
                    type: "GET_USER_AXIOS_ERROR",
                    date: new Date().toString()
                }) as SpotityMainPublicServiceResponse<AxiosError>;
            }

            return ({
                status: 500,
                data: error,
                message: "Something went wrong with the get user request. Contact @melzarjanchico.",
                type: "GET_USER_UNKNOWN_ERROR",
                date: new Date().toString()
            }) as SpotityMainPublicServiceResponse<unknown>;
        }
    }

    static async getUserTopTracks(time_range?:string, limit?:number, offset?:number) {
        const params = {
            time_range: time_range ?? 'short_term',
            limit: limit ? limit.toString() : "10",
            offset: offset ? offset.toString() : "0"
        };

        const url = `${this.API_URL}/tracks`;

        try {
            const response = await axios.get<SpotityMainPublicServiceResponse<TopTracksSuccessResponse>>(url, {params});
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return ({
                    status: 500,
                    data: error,
                    message: "Something went wrong with the axios requst.",
                    type: "GET_USER_TOP_TRACKS_AXIOS_ERROR",
                    date: new Date().toString()
                }) as SpotityMainPublicServiceResponse<AxiosError>;
            }

            return ({
                status: 500,
                data: error,
                message: "Something went wrong with the get user top tracks. Contact @melzarjanchico.",
                type: "GET_USER_TOP_TRACKS_UNKNOWN_ERROR",
                date: new Date().toString()
            }) as SpotityMainPublicServiceResponse<unknown>;
        }
    }

    static async getUserCurrentTrack() {
        const url = `${this.API_URL}/current_track`;

        try {
            const response = await axios.get<SpotityMainPublicServiceResponse<CurrentTrackSuccessResponse>>(url);
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return ({
                    status: 500,
                    data: error,
                    message: "Something went wrong with the axios requst.",
                    type: "GET_USER_CURRENT_TRACK_AXIOS_ERROR",
                    date: new Date().toString()
                }) as SpotityMainPublicServiceResponse<AxiosError>;
            }

            return ({
                status: 500,
                data: error,
                message: "Something went wrong with the get user current track. Contact @melzarjanchico.",
                type: "GET_USER_CURRENT_TRACK_UNKNOWN_ERROR",
                date: new Date().toString()
            }) as SpotityMainPublicServiceResponse<unknown>;
        }
    }
}