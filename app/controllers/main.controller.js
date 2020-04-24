var Url = require('../models/url');

module.exports = {
  showHome: showHome,
  getUrl: getUrl,
  postUrl: postUrl
}


/**
 * Show the home page
*/

 function showHome(req, res) {
   res.render('pages/home', {
     errors: req.flash('errors')
   });
 }


/**
 * Create a new short url for original URL
*/
 function postUrl(req, res) {
    console.log("post request");
    req.checkBody('url', 'You have to provide a valid url').notEmpty().isURL();// requires validator
	  console.log("validation achieved");

    // create new url
    const url = new Url({
      url: req.body.url
    });


    // if there are validation errors, redirect and flash error
    const errors = req.validationErrors();
    if (errors) {
      req.flash('errors', errors.map(err => err.msg));
      return res.redirect('/');
    }

   // save url to db
    url.save(function(err) {
      if (err){
        console.log("error save");
        console.log(err);
    }

    res.json(url);
  });
}



/**
 * Redirect to the original URL for short URL
*/
 function getUrl(req, res) {

  var id = req.params.id;
  console.log('search for '+id);

  Url.findById(id, function (err, url) {
    if (err) {
      console.log('could not find '+id);               
      return res.status(404).send({message: 'short url does no exist'});
    } else if(!url) {
      console.log('could not find '+bookid);
      return res.status(404).send({message: 'short url does no exist'});
    } else {
      console.log("returned "+id);      
      res.status(403).redirect(url.url);
    }     
  });
 }

 
