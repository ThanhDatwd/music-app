import React, { memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToastApp = (method,message) => {
    const notify = () => {
        switch (method) {
            case 'success':
                toast.success(message);
            break;
            case 'error':
                toast.error(message);
            break;
            case 'warning':
                toast.warn(message);
            break;
            case 'info':
                toast.info(message);
            break;
        
            default:
                toast("Thông báo từ ứng trình phát nhạc");
                break;
        }
      };
  
      notify()
      return (
          'chào bạn'
      )
}

export {ToastApp};
