//เอาไว้เช็คว่ากรอกตรงเงื่อนไขไหม
const valid = (name, email, password, cf_password) => {
    if(!name || !email || !password)
    return " Please complete the information. "

    if(!validateEmail(email))
    return" Invalid Email. "

    if(password.length < 6)
    return " Password must be at least 6 characters."

    if(password !== cf_password)
    return " Confirm password did not match. "
}

//ฟังก์ชันตรวจสอบที่อยู่อีเมล เวลาการกรอก email ต้องมี @ มี .xx
function validateEmail(email) {
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email)
}

export default valid