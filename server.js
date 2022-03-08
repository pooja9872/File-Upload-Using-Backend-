const express = require("express");
const multer = require("multer");

const app = express();

const fileStoreEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    },
})

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === './image/jgep' || file.mimetype === './image/jpg' || file.mimetype === './image/png') {
//         cb(null, true)
//     }
//     else {
//         console.log("Error in uploading");
//         cb(null, false)
//     }
// }

const upload = multer({ storage: fileStoreEngine })

app.set('view engine', "ejs");

app.get("/upload", (req, res) => {
    res.render("upload")
})

app.post("/single", upload.single('image'), (req, res) => {
    console.log(req.file);
    //console.log(req.body);
    res.send("Single file upload success");
})

app.post("/multiple", upload.array('images', 3), (req, res) => {
    console.log(req.files);
    res.send("Multple file upload successfull");

})

app.listen(8080, (req, res) => {
    console.log("listening to port 8080");
})