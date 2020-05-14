// CustomToast.js
import { toast } from 'react-toastify';
import { css } from 'glamor';

const CustomToast = {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: 'toast-success-container toast-success-container-after',
      progressClassName: css({
        background: '#0e6529',
      }),
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: 'toast-error-container toast-error-container-after',
      progressClassName: css({
        background: '#EE0022',
      }),
    });
  },
  info(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: 'toast-info-container toast-info-container-after',
      progressClassName: css({
        background: '#07F',
      }),
    });
  },
};


export default CustomToast;