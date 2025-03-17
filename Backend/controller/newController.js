
const NewMentor = require('../models/newmentorModel');
const asyncHandler = require('express-async-handler');

const createNewMentor = async (req, res) => {
    const {title,time,registration} = req.body;
 
try {
  
    if(!title || !time || !registration){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    
    const newData = await NewMentor.create({
        title,
        time,
        registration
    });

    if(newData){
        res.status(201).json({
            _id:newData._id,
            title:newData.title,
            time:newData.time,
            registration:newData.registration
        });
    }
    else{
        res.status(400);
        throw new Error("Invalid Mentor data");
    }
    
    

} catch (error) {
    res.status(500).json({message:"Server error"});
    console.error("Error creating Mentor:",error);
}


};



const updateNewMentor = asyncHandler(async (req, res) => {
const mentorid = await NewMentor.findById(req.params.id);

if(!mentorid){
    req.status(400)
    throw new Error("Mentor not found");
}

const {title,time,registration} = req.body;
const newData = await NewMentor.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
})

res.status(200).json({ success:true, data: newData});
});


const getNewMentor = asyncHandler(async (req, res) => {
    try {
        const allData = await NewMentor.find({});
        res.status(200).json({ success:true, data : allData });
       } catch (error) {
        console.error("Error getting all startups:", error);
        res.status(500).json({ success:false, message: "Server error" });
       }

});

const deleteNewMentor = asyncHandler(async (req, res) => {
const mentorid = await NewMentor.findById(req.params.id);
if(!mentorid){
    res.status(400);
    throw new Error("Mentor not found");
}
await mentorid.deleteOne();

res.status(200).json({ message: "Delete new Mentor" });
});

module.exports = {createNewMentor,updateNewMentor,getNewMentor,deleteNewMentor};