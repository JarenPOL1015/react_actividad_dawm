import { useEffect, useState } from 'react'
import './App.css'
import Item from './interface/Item'
import Grid from '@mui/material/Grid2' 
import TableWeather from './components/TableWeather';

function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect( () => {
    const dataToItems : Item[] = [];

    let request = async () => {
      {/* Request */}
      let API_KEY = "14938b9ae9f20310270b123d6217ec59";
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
      let savedTextXML = await response.text();

      {/* XML Parser */}
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      const forecastTimes = xml.getElementsByTagName("time");

      for (let i = 0; i < 6 ; i++) {
        const elemento_time = forecastTimes[i];
        const hora_desde = elemento_time.getAttribute("from") || "";
        const hora_hasta = elemento_time.getAttribute("to") || "";
        const precipitacion = elemento_time.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
        const humedad = elemento_time.getElementsByTagName("humidity")[0]?.getAttribute("value");
        const nubes = elemento_time.getElementsByTagName("clouds")[0]?.getAttribute("all");

        dataToItems.push({
          "dateStart": hora_desde || "",
          "dateEnd": hora_hasta || "",
          "humidity": humedad || "",
          "precipitation": precipitacion || "",
          "clouds": nubes || ""
        });

        setItems(dataToItems);
      }
    }

    request();
    
  }, []);

  return (
    <>
      <Grid container spacing={5}>
        {/* Tabla */}
        <TableWeather itemsIn={items} />   
    </Grid>
    </>
  )
}

export default App
