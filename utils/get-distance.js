import distance from 'hpsweb-google-distance'
import {useState,useContext,createContext} from 'react'
const ResultContext=createContext()
export default function getDistance(origin,destination){

  
  distance.apiKey="AIzaSyBcBdvwP0z8pM4bU87H7kvtefQYDFBpQzQ"
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