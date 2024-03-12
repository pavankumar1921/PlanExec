import { API_ENDPOINT } from "../config/constants";

export interface EventData {
    eventName: string;
    venue: string;
    description:string;
    date:string;
}

export const postEventData = async (eventData: EventData): Promise<void> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/createEvent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}` 
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("API endpoint not found");
            } else {
                throw new Error("Failed to post event data");
            }
        }
    } catch (error) {
        console.error("Error posting event data:", error);
        throw error;
    }
};

export const fetchEventData = async (): Promise<EventData[]> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/allEvents`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
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
