
const LandingPageServices = () => {
  return (
    <section className="w-full max-w-[1920px] mx-auto py-16 bg-black text-white">
        <div className="max-w-[1750px] mx-auto text-center flex flex-col gap-16">
          <div className='max-w-[1050px] mx-auto flex flex-col gap-8'>
            <h2 className="text-5xl font-bold mb-4">Our Services & Benefits</h2>
            <p className="text-2xl mb-12 leading-9 ">To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.</p>
          </div>
          <div className="flex justify-around gap-4">
            <div className="flex flex-col items-center  max-w-[402px] px-4 gap-6 ml-12">
              <img src="/images/featuredicon1.png" alt="Quality Choice Icon" className="h-16 mb-4"/>
              <h3 className="text-2xl tracking-wide font-semibold ">Quality Choice</h3>
              <p className='text-gray-300'>We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more.</p>
            </div>
            <div className="flex flex-col items-center  max-w-[452px] px-4 gap-6">
              <img src="/images/featuredicon2.png" alt="Affordable Prices Icon" className="h-16 mb-4"/>
              <h3 className="text-2xl tracking-wide font-semibold ">Affordable Prices</h3>
              <p className='text-gray-300'>Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips without breaking the bank.</p>
            </div>
            <div className="flex flex-col items-center  max-w-[452px] px-4 gap-6">
              <img src="/images/featuredicon3.png" alt="Convenient Online Booking Icon" className="h-16 mb-4"/>
              <h3 className="text-2xl tracking-wide font-semibold ">Convenient Online Booking</h3>
              <p className='text-gray-300'>With our easy-to-use online booking system, customers can quickly and conveniently reserve their rental car from anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default LandingPageServices