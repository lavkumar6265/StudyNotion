const RatingAndReview = require("../models/RatingAndRaview");
const Course = require("../models/Course");

//createRating
exports.createRating = async(req,res)=>{
    try{
        //get user id
        const userId = req.user.id;

        //fetchdata from req body
        const{rating,review,courseId} = req.body;
        
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}},})

            if(!courseDetails){
                return res.status(404).json({
                    success:false,
                    message:"Student is not enrolled in the course"
                })
            }

        //check if user already reviewed the course 
        const alreadyReviewed = await RatingAndReview.findOne({
                                    user:userId,
                                    course:courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            });
        }
        //create rating and review

        //update course with this raating/review
        //return response
    }
    catch(error){
        
    }
}

//getAverageRating

//getAllRating