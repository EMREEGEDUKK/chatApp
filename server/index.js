const express = require('express');
const app = express();


const router = express.Router();

const mongoose = require('mongoose');

const config = require('./configs/indexConfig');
const PORT = process.env.PORT || 3000

const cors = require('cors');

const userRoutes = require('../server/routes/userRoutes');


app.use(cors())
app.use(express.json())
app.use('/api/auth/',userRoutes)

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB CONNECTİON SUCCESFULL');
}).catch((err) => {
    console.log('err :>> ', err);
})








app.listen(PORT,() => {
    console.log(`${PORT} web server çalisiyor..`);
})






