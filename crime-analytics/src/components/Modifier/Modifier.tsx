import Styler from "../Styler/Styler";
import { useEffect, useState } from "react";
import {Menubar} from '@base-ui/react/menubar';
import {Menu} from '@base-ui/react/menu';
import { getColumnValues } from "../../utils/api";


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
            <Menu.Root>
                <Menu.Trigger className='m-2 p-2 bg-black border border-solid border-white text-white'>
                    Amenity 
                </Menu.Trigger>
                <Menu.Portal>
                    <Menu.Positioner>
                        <Menu.Popup className="m-1 p-1 bg-black text-white h-48 overflow-y-auto border border-white border-solid scrollbar-none scroll-smooth">
                            {amenities.map((amenity) => (
                                <Menu.Item className="text-white hover:bg-white hover:text-black">
                                    {amenity}
                                </Menu.Item>
                            ))}
                        </Menu.Popup>
                    </Menu.Positioner>
                </Menu.Portal>
            </Menu.Root>
        </div>
    )
}