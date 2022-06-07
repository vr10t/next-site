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
              ) 
        })
        
        .catch((e) => {
          console.log(e);
        });
    
    
    

    
  }