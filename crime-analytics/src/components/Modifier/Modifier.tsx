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
            setAmenities(data);
        }
        getAmenities();
    },[]);
    
    


    return (
        <div className="modifier">
            <Menu.Root>
                <Menu.Trigger className='amenity-button'>
                    Amenity 
                </Menu.Trigger>
                <Menu.Portal>
                    <Menu.Positioner>
                        <Menu.Popup>
                            {amenities.map((amenity) => (
                                <Menu.Item>
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