

const Footer = () => {
  return (

    <footer className="w-full max-w-[1920px] mx-auto pb-8 lg:py-14   bg-black text-white">
        <div className="max-w-[1750px] mx-auto flex flex-col text-xl p-6">
          <div className='flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row '>

            <div className="flex flex-col-reverse md:flex-row  w-[90%]  lg:w-2/4 justify-around  2xl:justify-between  mx-auto gap-16 md:gap-36   lg:gap-0  ">
              <div className='flex flex-col gap-16  min-w-72 mx-auto md:mx-0   text-center md:text-left  2xl:min-w-96 lg:pl-6'>
                <div className="">
                  <h3 className="font-bold mb-8 tracking-wider">Contact Us</h3>
                  <div className='text-gray-300 flex flex-col gap-4'>
                    <p >457 Washington Ave, <br /> Manchester, Kentucky </p>
                    <p>Working Hours: <br /> 8am - 7pm, Mon-Sat</p>
                    <p><a href="" className='hover:text-white'>support@prixi.com</a></p>
                  </div>
                </div>

                <div className="">
                  <h1  className=" text-2xl md:text-3xl ">Connect with us</h1>
                  <div className="flex space-x-4 mt-4">
                    <a href="#"><img src="/images/footerIcons/insta.png" alt="Instagram" className=" w-[55px] hover:h-[50px] hover:border-white hover:border-2 hover:rounded-full  "/></a>
                    <a href="#"><img src="/images/footerIcons/face.png" alt="Facebook" className=" w-[55px] hover:h-[50px] hover:border-white hover:border-2 hover:rounded-full "/></a>
                    <a href="#"><img src="/images/footerIcons/twitt.png" alt="Twitter" className=" w-[55px] hover:h-[50px] hover:border-white hover:border-2 hover:rounded-full "/></a>
                    <a href="#"><img src="/images/footerIcons/yt.png" alt="YouTube" className=" w-[55px] hover:h-[50px] hover:border-white hover:border-2 hover:rounded-full  "/></a>
                  </div>
                </div>
              </div>
              <div className="min-w-72 mx-auto md:mx-0  text-center md:text-left 2xl:min-w-96">
                <h3 className="font-bold mb-8 tracking-wider">Support</h3>
                <ul className='flex flex-col gap-4 text-gray-300'>
                  <li><a href="#" className="hover:text-white">Forum Support</a></li>
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Live Chat</a></li>
                  <li><a href="#" className="hover:text-white">How it Works</a></li>
                  <li><a href="#" className="hover:text-white">Privacy & Security</a></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row  w-[90%]  lg:w-2/4 justify-around  2xl:justify-between  mx-auto  gap-16 md:gap-36  lg:gap-0  ">
              <div className="min-w-72 mx-auto md:mx-0 text-center md:text-left 2xl:min-w-96">
                <h3 className="font-bold mb-8 tracking-wider">Company</h3>
                <ul className='flex flex-col gap-4 text-gray-300'>
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Community Blog</a></li>
                  <li><a href="#" className="hover:text-white">Jobs and Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Our Awards</a></li>
                </ul>
              </div>
              
              <div className="min-w-72 mx-auto md:mx-0 text-center md:text-left 2xl:min-w-96">
                <h3 className="font-bold mb-8 tracking-wider">Legal</h3>
                <ul className='flex flex-col gap-4 text-gray-300'>
                  <li><a href="#" className="hover:text-white ">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Cookies Policy</a></li>
                  <li><a href="#" className="hover:text-white">Data Policy</a></li>
                  <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                </ul>
              </div>
            </div>

          </div>

          <br /><br />
          <hr />
          <br /><br />

          <div className='flex flex-col-reverse justify-between px-7 lg:flex-row  gap-12'>
            <div className="mx-auto lg:mx-0 ">
              <img src="/images/PWlogo.png" alt="Prixilogo" className="h-10 mx-auto lg:mx-0"/>
              <p className="mt-4 text-xl">© 2023 Prixi. All rights reserved.</p>
            </div>
            <div className='max-w-[600px] mx-auto lg:mx-0'>
              <div className='flex justify-around text-2xl'>
                <p className="flex items-center "><span className="mr-2">📞</span> Need help? Call us </p>
                <a href="tel:1-800-222-8888" className="font-bold  ">1-800-222-8888</a>
              </div>
              
              <div className="mt-4 lg:mt-5 xl:mt-3 2xl:mt-2 flex gap-9 text-xl ">
                <a href="#" className="hover:opacity-60">Privacy Policy</a>
                <a href="#" className="hover:opacity-60">Legal Notice</a>
                <a href="#" className="hover:opacity-60">Terms</a>
                <a href="#" className="hover:opacity-60">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer