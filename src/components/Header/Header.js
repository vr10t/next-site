
import Form from '../Modal/Form';

import Navbar from '../Navbar/Navbar.js';

import BgCarousel from '../Background/Carousel';
export default function Header({children}){
    return(
    <div>
    <Navbar  >
   {children}
   </Navbar>
    <BgCarousel  className=""/>
    
      
</div>
    )
}




      


 