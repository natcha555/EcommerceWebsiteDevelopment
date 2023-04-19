//1 เก็บค่าข้อมูลที่จะใช้ (ข้อมูลส่วนกลางที่ต้องใช้ซ้ำ)
require('dotenv').config()

module.exports = {
    env:{
        "BASE_URL":"http://localhost:3000",
        "MONGODB_URL":"mongodb+srv://akira:JQDsSZB5i9iwRLB5@cluster0.uc6z7qg.mongodb.net/shop?retryWrites=true&w=majority",
        "ACCESS_TOKEN_SECRET": "akira8070502543302664",
        "REFRESH_TOKEN_SECRET":"akirasecret52295869rere61607594",
        "PAYPAL_CLIENT_ID": "AXFhKALNCUzCj9DTcVYo2wmgQfn47XOpxbzloTwqYQX4bc8rhWMm-IJjuPTo-jbLCJRwB-izOdEiJOBV",
        "CLOUND_UPDATE_PRESENT":"nextjs_store",
        "CLOUND_NAME":"daqt8gqb8",
        "CLOUND_API":"https://api.cloudinary.com/v1_1/daqt8gqb8/image/upload",
        OMISE_PUBLIC_KEY : process.env.OMISE_PUBLIC_KEY
    }
}

//เพื่อไว้เก็บค่าข้อมูล เวลาแก้ไขจะได้มาแก้ที่ next.config.js นี้ไฟล์เดียว ซึ่งค่าที่เก็บจะเปิดเผยและสามารถไปแสดงบน Browser ได้