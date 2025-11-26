import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MyMap() {
    return (
        <MapContainer
            center={[36.244, 59.592]}
            zoom={16}
            style={{ height: "600px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[36.244, 59.592]}
                draggable={true}
                eventHandlers={{
                    click: () => console.log("clicked"),
                    dragend: (e) => console.log(e.target.getLatLng()),
                }}>
                <Popup>محل فروشگاه</Popup>
            </Marker>
        </MapContainer>
    );
}
