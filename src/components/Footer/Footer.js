import React from 'react';

import {FaFacebook} from '@react-icons/all-files/fa/FaFacebook'
import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter'
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
export default function Footer() {
  return (
    <div className='shadow '>
    <footer className='text-center  bg-stone-200' >
   
      <div className='p-4'>
        <section className='mb-4 '>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className='text-center '>
          <div className="grid grid-cols-4">
            <div className='mb-4 flex flex-col '>
              <h5 className='text-uppercase'>Address</h5>

              <h7 className='text-muted'>123, Lorem Street,
Hemel Hempstead, Beds, HP1 ABC</h7>
            </div>

            <div className='mb-4 flex flex-col'>
              <h5 className='text-uppercase'>Social</h5>

              <section className='mb-2 flex justify-center '>
          <a 
          className='float-left mt-2 mx-2 text-4xl text-muted'
          href='#!' role='button'>
            <FaFacebook />
          </a>

          <a className='float-left mt-2 mx-2 text-4xl text-muted' href='#!' role='button'>
            <FaTwitter />
          </a>

          <a className='float-left mt-2 mx-2 text-4xl text-muted' href='#!' role='button'>
            <FaInstagram />
          </a>

        </section>
            </div>

            <div className='mb-4 flex flex-col'>
              <h5 className='text-uppercase'>Contact</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-muted'>
                  (123) 456-78-90                  </a>
                </li>
                <li>
                  <a href='#!' className='text-muted'>
                    contact@example.com
                  </a>
                </li>
                
              </ul>
            </div>
            <div className='mb-4 flex flex-col'>
              <h5 className='text-uppercase'>Useful Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-muted'>
                  Terms of Service                 </a>
                </li>
                <li>
                  <a href='#!' className='text-muted'>
                   Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-muted'>
                   FAQ
                  </a>
                </li>
                
              </ul>
            </div>

            
          </div>
        </section>
        
        
      </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Copyright © 2022
       
      </div>
    </footer>
    </div>
  );
}