const express = require("express");
const router = express.Router();
const wrapAsynk= require("../utils/wrapAsynk.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner,validateListing}= require("../middleware.js");
const listingsControler = require("../controlers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
 .route("/")
 .get( wrapAsynk(listingsControler.index))
 .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsynk(listingsControler.createListing) );

 // new route
router.get("/new",isLoggedIn,listingsControler.renderNewForm);

router
.route("/:id")
.get(wrapAsynk(listingsControler.ShowListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsynk(listingsControler.updateListing))
.delete(isLoggedIn, isOwner,wrapAsynk(listingsControler.deleteListing));

 //edit Route 
 router.get("/:id/edit", isLoggedIn,isOwner,wrapAsynk(listingsControler.renderEditForm));
   

module.exports= router;