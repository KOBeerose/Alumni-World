import {React, useState} from 'react'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import alumaniData from './data.json'
import icon1 from './images/location.svg'

const alumaniIcon = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25]
})


function App() {
  const [ activeAlumani, setActiveAlumani ] = useState( null );
  return (

      <MapContainer 
          center = { [ 31.1728205, -7.3362482 ] }
          zoom = { 5 }
          scrollWheelZoom = { true } 

      >
      <TileLayer 
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />

       {/* <TileLayer 
          attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
          url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> */}
       { alumaniData.map(eachData => (
         <Marker 
            key={eachData.Id} 
            position= {[eachData.Latitude, eachData.Longitude]}
            eventHandlers={{
              click: () => {
                setActiveAlumani(eachData)
              }
            }}
            icon= {alumaniIcon}
          />
       ))}

      { activeAlumani && (
        <Popup 
          position={ [ activeAlumani.Latitude, activeAlumani.Longitude ] }
          onClose={()=>{
            setActiveAlumani(null)
          }}
        >
          <div>
            <h1>INPT Alumni</h1>
            <p>Location:     { activeAlumani.Location }</p>

            <div>
              {
                Object.keys(activeAlumani.Company_count).map((key, index) => ( 
                  <p key={index}> {key} : {activeAlumani.Company_count[key]}</p> 
                ))
              }
            </div>
          </div>
        </Popup>
      )}

      </MapContainer> 
  
  );
}

export default App;


