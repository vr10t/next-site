import distance from 'hpsweb-google-distance'
import {useState,useContext,createContext} from 'react'
const ResultContext=createContext()
export default function getDistance(origin,destination){

  
  distance.apiKey=process.env.GOOGLE_API_KEY
   distance
    .get({
      origin: `${origin}`,
      destination: `${destination}`,
      units: "imperial"
    })
    .then(function (data) {
     
      return data
  
      
    })
    .catch(function (err) {
      console.log(err);
      alert("Please provide a valid route")
    });
  // return distance.then((data)=>data)
    
}