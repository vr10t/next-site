import "../styles/globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';
// import "https://maps.googleapis.com/maps/api/js?key=AIzaSyBcBdvwP0z8pM4bU87H7kvtefQYDFBpQzQ&libraries=places"
import { AppWrapper, AuthWrapper } from "../src/context/state";
export default function MyApp({ Component, pageProps }) {
  
    return (
      <AppWrapper>
      <AuthWrapper>
    <Component {...pageProps} />
    </AuthWrapper>
    </AppWrapper>)
  }