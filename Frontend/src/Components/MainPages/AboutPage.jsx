import React from 'react'
import Oppurtunity from '../Oppurtunity'

const AboutPage = () => {
  return (
    <div>
        <div className=''>
<div className=' flex justify-center item-center'>
<h1 className="text-3xl md:text-8xl   font-bold text-center md:text-left drop-shadow-lg hover:drop-shadow-2xl">
      About US
    </h1>
</div>
<div className='my-10 text-center'>
<p >At Alumni Nexus, we are dedicated to connecting alumni and their college.<br/> We provide a platform for alumni to mentor their fellow members,<br/> offer guidance to current students, and stay updated with news, events, and job opportunities.</p>

</div>
</div>

      <div className="flex bg-[#172554] m-20  h-[450px] space-x-16 items-center  ">
  <div className="w-1/2">
    <img className="h-[450px] w-full object-cover rounded-md" src="../src/assets/vvit_students.jpg" alt="Our Mission" />
  </div>
  <div className="text-white w-1/2 flex flex-col justify-center space-y-4">
    <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left drop-shadow-lg hover:drop-shadow-2xl">
      Our Mission
    </h1>
    <p className="text-sm md:text-lg leading-relaxed">
      We’re here to create a bridge between VVIT graduates, past and present. Our mission is to build an inclusive community where alumni
      can network, learn, and grow together while giving back to VVIT. We strive to nurture lifelong relationships and provide resources
      that help our alumni succeed personally and professionally. From supporting student mentorship to fostering career growth and connecting
      alumni worldwide, our mission is rooted in enhancing the alumni experience and making VVIT a source of inspiration for all.
    </p>
  </div>
</div>

<div className="flex bg-[#172554] m-20 h-[450px] space-x-16 items-center  ">
  <div className="text-white w-1/2 flex flex-col justify-center space-y-4">
    <div className='px-14'>
    <h1 className="text-3xl md:text-5xl   font-bold text-center md:text-left drop-shadow-lg hover:drop-shadow-2xl">
      Our Vission
    </h1>
    </div>
    <p className="text-sm m-12 md:text-lg leading-relaxed">
    We aim to be a global leader in alumni engagement by leveraging technology, shared experiences, 
    and mutual support. Our vision is to make every VVIT graduate feel connected to a global 
    community that continues to inspire, empower, and transform lives. Through impactful events, 
    career services, lifelong learning, and support networks, we hope to make the VVIT Alumni
     Association a driving force that fosters success and personal growth, while celebrating the 
     achievements and legacy of our alumni.
    </p>
  </div>
  <div className="w-1/2">
    <img className="h-[450px] w-full object-cover rounded-md" src="../src/assets/pic3.jpeg" alt="Our Mission" />
  </div>
</div>
<div>
<div className=' flex justify-center item-center '>
<h1 className="text-3xl md:text-5xl font-bold md:text-left drop-shadow-lg hover:drop-shadow-2xl">
    Our History
</h1>
</div>
<div className='m-12'>
    <p>
    The VVIT Alumni Association was born out of a simple idea—to keep the spirit of VVIT alive long after graduation. Since 2007, our community has grown from a small group of dedicated alumni to an extensive network that spans across the globe. Through the years, we’ve adapted to changing times, adding digital resources, virtual events, and global chapters to meet the needs of our diverse alumni community. Today, we stand as a testament to the bonds created at VVIT, offering a space where alumni can reconnect, contribute, and make a difference
    </p>
</div>
</div>
<div className='flex justify-center item-center'>
<h1 className="text-3xl md:text-5xl   font-bold text-center md:text-left drop-shadow-lg hover:drop-shadow-2xl">
      What We Offer
    </h1>
</div>
<Oppurtunity/>
    </div>
  )
}

export default AboutPage
