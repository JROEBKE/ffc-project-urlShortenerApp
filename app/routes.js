// create a new express router
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller');

// export router
module.exports = router;


// show home page
router.get('/', mainController.showHome);

// getURL
router.get('/:id', mainController.getUrl);

// postURL
router.post('/create', mainController.postUrl);
