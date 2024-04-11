import { IntegerDataType } from "sequelize";
import { API_ENDPOINT } from "../config/constants";

export interface ServiceData {
    name: string;
    description: string;
    contact: string;
}

export const postServiceData = async (serviceData: ServiceData): Promise<void> =>{
    try {
        const response = await fetch(`${API_ENDPOINT}/createService`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}` 
            },
            body: JSON.stringify(serviceData),
        })
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("API endpoint not found");
            } else {
                throw new Error("Failed to post event data");
            }
        }
    }catch (error) {
        console.error("Error posting event data:", error);
        throw error;
    }
}

export const fetchServiceData = async (): Promise<ServiceData[]> => {
    try {
        const response= await fetch(`${API_ENDPOINT}/allServices`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Services not found");
            } else {
                throw new Error("Failed to fetch services");
            }
        }

        return await response.json();
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}