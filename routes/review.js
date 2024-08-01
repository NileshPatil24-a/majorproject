const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsynk= require("../utils/wrapAsynk.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing= require("../models/listing.js")
const {validateReview,isLoggedIn,isReviewauthor} = require("../middleware.js");
const reviewController = require("../controlers/reviews.js");


// Review
// post route
router.post("/" ,isLoggedIn, validateReview, wrapAsynk(reviewController.createReview));
 
 // Delete review route
 router.delete("/:reviewId",isLoggedIn,isReviewauthor, wrapAsynk(reviewController.destroyReview));

 module.exports=router;