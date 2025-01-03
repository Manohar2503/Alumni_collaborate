const express= require("express");
const route = express.Router();
const {getGoals,postGoals,putGoals,deleteGoals} = require("../controller/goalController")



route.route('/').get(getGoals).post(postGoals);
//route.get("/",getGoals)
//route.post("/",postGoals)
route.route('/:id').put(putGoals).delete(deleteGoals);
//route.put("/:id", putGoals)
//route.delete("/:",deleteGoals)

module.exports = route;