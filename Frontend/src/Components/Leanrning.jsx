import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

const Leanrning = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold justify-center text-center my-[20px]">Learning Path</h1>
      <div className='justify-center text-center  m-4 rounded-2'>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
          placeholder="Search for Courses..." 
          type="text" 
          name="search"
        />
      </div>
      <div className=''>
        <ul className='flex justify-center text-center gap-5'>
          <li className='cursor-pointer'>Courses</li>
          <li className='cursor-pointer'>Playlist</li>
          <li className='cursor-pointer'>Certificates</li>
         <Link to='/form'>
         <li>Add</li></Link>
        </ul>
      </div>
      <div>
        <h1 className="text-2xl font-bold justify-center text-center my-[20px]">Courses</h1>
      </div>
      <div className='grid gap-6 m-4 sm:grid-cols-2 md:grid-cols-3  '>


        <div className='bg-[#f3f4f6] w-[85%] h-[85%] rounded flex flex-col  justify-between text-center'>
          <img className='w-[100%] h-[60%] p-4' src="../src/assets/web.jpg" alt='' />
          <h1 className="text-3xl font-bold justify-center text-center my-[10px]">Web Development</h1>
          <div className='flex gap-4'>
            <i className="material-icons ">schedule</i>
            <h2>6 months course</h2>
          </div>
          <div className='my-3 mx-6'>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          </div>
          <div 
  className='flex m-4 bg-[#3b82f6] cursor-pointer w-auto px-4 py-2 items-center justify-center rounded-full  hover:bg-black'
  onClick={() => window.open("https://www.youtube.com/@akshaymarch7", "_blank")}
>
  <p className='text-center text-white'>Playlist</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>


        <div className='bg-[#f3f4f6] w-[85%] h-[85%] rounded flex flex-col  justify-between'>
          <img className='w-[100%] h-[60%] p-4' src="../src/assets/python.jpg" alt='' />
          <h1 className="text-3xl font-bold justify-center text-center my-[10px]">Python Course</h1>
          <div className='flex gap-4'>
            <i className="material-icons ">schedule</i>
            <h2>6 months course</h2>
          </div>
          <div className='my-3 mx-6'>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          </div>
          <div 
  className='flex m-4 bg-[#3b82f6] cursor-pointer w-auto px-4 py-2 items-center justify-center rounded-full  hover:bg-black'
  onClick={() => window.open("https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3", "_blank")}
>
  <p className='text-center text-white'>Playlist</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>


        <div className='bg-[#f3f4f6] w-[85%] h-[85%] rounded flex flex-col  justify-between'>
          <img className='w-[100%] h-[60%] p-4' src="../src/assets/ml.jpg" alt='' />
          <h1 className="text-3xl font-bold justify-center text-center my-[10px]">Machine Learning</h1>
          <div className='flex gap-4'>
            <i className="material-icons ">schedule</i>
            <h2>6 months course</h2>
          </div>
          <div className='my-3 mx-6'>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          </div>
         <div 
  className='flex m-4 bg-[#3b82f6] cursor-pointer w-auto px-4 py-2 items-center justify-center rounded-full  hover:bg-black'
  onClick={() => window.open("https://medium.com/@cneuralnetworks/introduction-to-machine-learning-e272cf75b5b0", "_blank")}
>
  <p className='text-center text-white'>Playlist</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>


        <div className='bg-[#f3f4f6] w-[85%] h-[85%] rounded flex flex-col  justify-between'>
          <img className='w-[100%] h-[60%] p-4' src="../src/assets/java.jpg" alt='' />
          <h1 className="text-3xl font-bold justify-center text-center my-[10px]">Java Course</h1>
          <div className='flex gap-4'>
            <i className="material-icons ">schedule</i>
            <h2>6 months course</h2>
          </div>
          <div className='my-3 mx-6'>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          </div>
         <div 
  className='flex m-4 bg-[#3b82f6] cursor-pointer w-auto px-4 py-2 items-center justify-center rounded-full  hover:bg-black'
  onClick={() => window.open("https://www.youtube.com/@https://www.youtube.com/watch?v=7TOmdDJc14s&list=PLsyeobzWxl7pUPF2xjjJiG4BKC9x_GY46", "_blank")}
>
  <p className='text-center text-white'>Playlist</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>


        <div className='bg-[#f3f4f6] w-[85%] h-[85%] rounded flex flex-col  justify-between'>
          <img className='w-[100%] h-[60%] p-4' src="../src/assets/dsa.jpg" alt='' />
          <h1 className="text-3xl font-bold justify-center text-center my-[10px]">Dsa Course</h1>
          <div className='flex gap-4'>
            <i className="material-icons ">schedule</i>
            <h2>6 months course</h2>
          </div>
          <div className='my-3 mx-6'>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          </div>
         <div 
  className='flex m-4 bg-[#3b82f6] cursor-pointer w-auto px-4 py-2 items-center justify-center rounded-full  hover:bg-black'
  onClick={() => window.open("https://www.youtube.com/@https://www.youtube.com/watch?v=yRpLlJmRo2w&list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop", "_blank")}
>
  <p className='text-center text-white'>Playlist</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>


        <div className='bg-[#f3f4f6] w-[85%] h-[85%] rounded flex flex-col  justify-between'>
          <img className='w-[100%] h-[60%] p-4' src="../src/assets/ai.jpg" alt='' />
          <h1 className="text-3xl font-bold justify-center text-center my-[10px]">Artificial Intelligence</h1>
          <div className='flex gap-4'>
            <i className="material-icons ">schedule</i>
            <h2>6 months course</h2>
          </div>
          <div className='my-3 mx-6'>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          <i className="material-icons icon">star</i>
          </div>
         <div 
  className='flex m-4 bg-[#3b82f6] cursor-pointer w-auto px-4 py-2 items-center justify-center rounded-full  hover:bg-black'
  onClick={() => window.open("https://www.youtube.com/watch?v=ajWheP8ZD70&list=PLmQAMKHKeLZ-iTT-E2kK9uePrJ1Xua9VL", "_blank")}
>
  <p className='text-center text-white '>Playlist</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</div>

        </div>
      </div> 

      <div>
        
      </div>
      <h1 className="text-4xl font-bold justify-center text-center my-[80px]">Certificate Courses</h1>
    </div>   
  )
}
export default Leanrning;