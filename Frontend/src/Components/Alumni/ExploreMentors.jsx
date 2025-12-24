import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
const ExploreMentors = () => {
    const [exploreMentors, setExploreMentors]=useState([]);
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        const fetchMentors=async()=>{
            try{
                const res=await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/mentors/allmentors`);
                setExploreMentors(res.data);
            }catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Something went wrong');
            }finally{
                setLoading(false);
            }
        }
        fetchMentors();
    }, []);

    if(loading){
        return(
            <div className='min-h-screen flex items-center justify-center'>
                <p className='text-lg font-semibold'>loading mentors....</p>
            </div>
        )
    }
  return (
    <div className='min-h-screen transition-smooth duration-300'>
      <h1 className='text-4xl font-bold text-center py-6'>Meet our talented mentors</h1>
     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {exploreMentors.map((item)=>(                
                <div key={item.id} className='bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden group p-4'>

                    <img className='w-full h-60 object-cover rounded-lg mb-4' src={item.image} alt={item.name}/>

                    <h2 className='text-2xl font-bold'>{item.name}</h2>

                    <h4 className='text-lg text-gray-700'>{item.company}<span className='text-sm text-gray-500 ml-2'>{item.experience}</span></h4>
                    
                    <p className='text-sm text-gray-700 mt-2'>{item.smallIntro}</p>
                    <div className='text-sm text-gray-700 mt-2'>
                        <strong className='py-4'>Technologies: </strong>
                        <div className='flex flex-wrap gap-2'>
                            {item.technologies.map((skill, index)=>(
                                <span key={index} 
                                className='px-2.5 py-1 bg-blue-50 text-gray-700 text-xs rounded-md font-medium'>{skill}</span>
                            ))}
                        </div>
                    </div>
                   
                    
                    <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-xs text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 mt-3'
                    >LinkedIn Profile →</a>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ExploreMentors
