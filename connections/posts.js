const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
//使用replace方法將password密碼取代成DATABASE_PASSWORD
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)
mongoose.connect(DB)
.then(() => console.log('資料庫連接成功'));
