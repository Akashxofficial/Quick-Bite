import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
           <div className='footer-content-left'>
               <img src={assets.logo} alt=''/>
               <p>Discover the joy of cooking with our curated recipes, expert tips, and culinary inspiration. At Quick Bite , we are passionate about bringing you closer to the flavors and aromas that make every meal special. Whether you are a novice cook or a seasoned chef, our goal is to enhance your kitchen adventures.</p>
               <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
               </div>
           </div>
           <div className='footer-content-center'>
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
              </ul>
           </div>
           <div className='footer-content-right'>
               <h2>GET IN TOUCH</h2> 
               <ul>
                   <li>+91 9829755926</li>
                   <li>contact@Quickbite.com</li>
               </ul>
           </div>
        </div>
        <hr/>
        <p className='footer-copyright'>2025 © Quickbite.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
