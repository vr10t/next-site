import React from 'react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {supabase} from '../../utils/supabaseClient'
import distance from 'hpsweb-google-distance'
import  {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import getDistance from '../../utils/get-distance'
const PlacesAutocomplete = dynamic(() => import('react-places-autocomplete'))

 
export default function Input(props) {
    
 const [origin, setOrigin]= useState("")
 const [destination,setDestination]= useState("")
 const [distanceResults,setDistanceResults]= useState({})
 
 const handleChangeOrigin = e => {
   setOrigin(e)
  };
 
 const handleSelectOrigin = e => {
    geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(latLng => {console.log('Success', latLng)
    })
      .catch(error => console.error('Error', error));
      setOrigin(e)
      console.log('origin:', origin)
  };
  const handleChangeDestination = e => {
    setDestination(e)
  }
  const handleSelectDestination = e => {
     geocodeByAddress(e)
       .then(results => getLatLng(results[0]))
       .then(latLng => {console.log('Success', latLng)
     })
       .catch(error => console.error('Error', error));
       setDestination(e)
       console.log('destination:', destination)
   };
   
   function handleGetDistance(){
    distance.apiKey="AIzaSyBcBdvwP0z8pM4bU87H7kvtefQYDFBpQzQ"
    distance
     .get({
       origin: `${origin}`,
       destination: `${destination}`,
       units: "imperial"
     })
     .then(function (data) {
      
    
      setDistanceResults(data)
        console.log(distanceResults)
        
   
       
     })
     .catch(function (err) {
       console.log(err);
       alert("Please provide a valid route")
     });
   
   }
   function handleSearch(){
     handleGetDistance()

   }

  
    return (
        <>
        
      <PlacesAutocomplete
        value={origin}
        onChange={handleChangeOrigin}
        onSelect={handleSelectOrigin}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <PlacesAutocomplete
        value={destination}
        onChange={handleChangeDestination}
        onSelect={handleSelectDestination}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button onClick={handleGetDistance}>GO</button>
     <div>distance:{distanceResults.distance}</div> 
      </>
      
    );
    
  }
  
