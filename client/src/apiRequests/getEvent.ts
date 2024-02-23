import { API_ENDPOINT } from "../config/constants";

export interface EventData {
    id:number
    eventName: string;
    venue: string;
}

export const fetchEventData = async (): Promise<EventData[]> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/allEvents`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Events not found");
            } else {
                throw new Error("Failed to fetch events");
            }
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
