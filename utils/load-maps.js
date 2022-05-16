import Script from "next/script";
export default async function loadMaps(){
    return <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcBdvwP0z8pM4bU87H7kvtefQYDFBpQzQ&libraries=places"></Script>
}