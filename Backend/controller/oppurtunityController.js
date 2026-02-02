const Oppurtunity=require('../models/OppurtunityModel');
const User=require("../models/userModel")

const getJobs=async(req, res)=>{
    try {
        const jobs=await Oppurtunity.find({type: "job"});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getInternships=async(req, res)=>{
    try {
        const internships=await Oppurtunity.find({type: "internship"});
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postOppurtunity=async(req, res)=>{
    try {
        // const id=req.params.id;
        // const user=await User.findById(id);
        // if(user.role!=="alumni"){
        //     console.log("Restricted access")
        //     throw new Error({message: "Restricted access"})
        // }
        const {company, role, link, type}=req.body;

        if(!company || !role || !link || !type){
            return res.status(400).json({
                message: 'All required fields must be provided'
            })
        }
            const oppurtunity=new Oppurtunity({company, role, link, type});
            const data=await oppurtunity.save();
            res.status(201).json({
                    message: 'Oppurtunity created successfully',
                    data
                });
            
    } catch (error) {
            res.status(500).json({
            message: 'Error creating Oppurtunity',
            error: error.message
        });

    }
}

// const postBlog=async(req, res)=>{
//     try {
//         const {title, description, author, publishedDate, category, tags}=req.body();

//         if(!title || !description || !author || !publishedDate || !category || !tags){
//             return res.status(400).json({
//                 message: 'All required fields must be provided'
//             })
//         }

//     const blog=new Blog({title, description, author, publishedDate, category, tags});
//     const data=await blog.save();
//     res.status(201).json({
//             message: 'Blog created successfully',
//             data
//         });
//     } catch (error) {
//             res.status(500).json({
//             message: 'Error creating Blog',
//             error: err.message
//         });

//     }
// }

module.exports={
    getJobs, getInternships, 
    postOppurtunity,
}