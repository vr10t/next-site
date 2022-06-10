import { Loader } from "@googlemaps/js-api-loader";



export  function handleGetDistance(location, destination,callback) {
   
  let service
  
   const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });
    
      loader
        .load()
        .then((google) => {
          service = new google.maps.DistanceMatrixService();
          console.log(service);
          
            service.getDistanceMatrix(
              {
                origins: [location],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidTolls: true,
              },
              callback
            ) ;
            
         
        })
        
        .catch((e) => {
          console.log(e);
        });
    
    
    

    
  }
  export async function reverseGeocode(lat, long) {
    try {
      let res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );
      let data = await res.json();
      console.log(data.results[0].formatted_address);
      return (data.results[0].formatted_address);
    } catch (err) {
      alert(err.message);
    }
  }