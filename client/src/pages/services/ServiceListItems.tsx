import React, {useEffect, useState,FC } from "react";
import { fetchServiceData,ServiceData } from "../../apiRequests/getService";
import CreateServiceModal from "./CreateServices";
import { useTranslation } from "react-i18next";

const Services: FC = () => {
    const [services, setServices] = useState<ServiceData[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceData = await fetchServiceData()
                setServices(serviceData)
                setLoading(false)
            }catch(error){
                console.error("Error fetching data:", error);
                setError("Error fetching data. Please try again later.");
                setLoading(false);
            }
        }
        fetchData()
    },[])
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

      return (
        <div>
            <div>
                <CreateServiceModal />
            </div>
            <h1>{t("Services")}</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}> 
            {services.map((service, index) => (
            <div
                key={index}
                style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                margin: "10px",
                }}
            >
            <h2>{t("Name")}: {service.name}</h2>
            <p>{t("Description")}: {service.description}</p>
            <p>{t("Contact")}: {service.contact}</p>

          </div>
        ))}
      </div>
        </div>
      )
}

export default Services