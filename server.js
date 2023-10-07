// importing required node-modules
const EXPRESS = require("express");
const CORS = require("cors");
let corsPort = {
    origin : "http://localhost:8081"
};

const APP = EXPRESS();

// configuring app
APP.use(CORS(corsPort));
APP.use(EXPRESS.json()); // parsing requests as json
APP.use(EXPRESS.urlencoded(
    {
        extended : true
    }
)); // encoding urls

// setting a simple route
APP.get("/", (request, response) => {
    response.json({ message : "The application was launched."});
});


// set port and listen to requests
const PORT = process.env.PORT || 8080;

// overview
require("./app/routes/overview/category-item.routes.js")(APP);
require("./app/routes/overview/hero-image.routes.js")(APP);

// page
require("./app/routes/page/short-information.routes.js")(APP);

// project
require("./app/routes/project/model-reference.routes.js")(APP);
require("./app/routes/project/project-gallery.routes.js")(APP);
require("./app/routes/project/project-item.routes.js")(APP);
require("./app/routes/project/project-location.routes.js")(APP);
require("./app/routes/project/project-information.routes.js")(APP);
require("./app/routes/project/project-series-gallery.routes.js")(APP);
require("./app/routes/project/film-stock.routes.js")(APP);

APP.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});