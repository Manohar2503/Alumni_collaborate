const express=require('express');
const router=express.Router();

const{
    getJobs,postOppurtunity, getInternships,
}=require('../controller/oppurtunityController');

router.get('/getJobs', getJobs);
router.post('/postOppurtunity', postOppurtunity);
router.get('/getInternships', getInternships);
// router.post('/getBlogs', getBlogs);
// router.post('/postBlog', postBlog);

module.exports=router;