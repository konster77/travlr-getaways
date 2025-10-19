require('dotenv').config();
const express=require('express');
const path=require('path');
const cors=require('cors');
const helmet=require('helmet');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const hbs = require('hbs');     

const app=express();
app.use(helmet());
app.use(cors({origin:true, credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.set('views', path.join(__dirname,'views'));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));  
app.use('/public', express.static(path.join(__dirname,'public')));

mongoose.connect(process.env.MONGODB_URI);

// Public MVC pages
app.use('/', require('./routes/web'));

// REST API
app.use('/api/auth', require('./routes/auth'));       // customer+admin login/register
app.use('/api/trips', require('./routes/trips'));     // list/search trips public; writes admin
app.use('/api/bookings', require('./routes/bookings'));// customer bookings (protected)
app.use('/api/itineraries', require('./routes/itineraries')); // booking itineraries (protected)

app.listen(3000, ()=>console.log('🚀 http://localhost:3000'));
