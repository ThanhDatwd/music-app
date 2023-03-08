import React from 'react';

const checkMail = (value) => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (value == '') {
        return 'Email không được để trống'
    }
    else if (!filter.test(value)) {
        return 'Vui lòng nhập đúng định dạng của email'
    }
    else {
        
    }
}
const checkPassword=(value)=>{
    const regex=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/
    if (value == '') {
        return 'Mật khẩu không được để trống'
    }
    // else if(!regex.test(value)){
    //     return 'Mật khẩu phải có ít nhất 8 ký tự bao gồm một ký tự hoa, một ký tự đặc biệt và các ký tự chữ và số'
    // }
    // else{
        
    // }
        
}

export {
    checkMail,
    checkPassword
};
