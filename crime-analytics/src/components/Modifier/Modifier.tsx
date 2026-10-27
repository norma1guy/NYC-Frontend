import { useEffect, useState } from "react";
import { getColumnValues } from "../../utils/api";
import DropDown from "../DropDown/DropDown";


export default function Modifier(){

    const [amenities,setAmenities] = useState<string[]>([]);

    useEffect(() => {
        async function getAmenities(){
            const data = await getColumnValues('amenity');
            if(!data)return;

            const cleaned_data = data.map((entry) =>
                entry ? (
                    entry === "wifi;telephone;device_charging_station" ? 
                    entry = "Wifi/Telephone/Device Charging Station" :
                    entry.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')
                ): entry
            );
            setAmenities(cleaned_data);
        }
        getAmenities();
    },[]);
    
    


    return (
        <div className="modifier">
            <DropDown name="Amenity" values={amenities} example="Hospital"/>
        </div>
    )
}




