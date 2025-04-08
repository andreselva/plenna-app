import Swal from 'sweetalert2';

const AlertToast = ({ icon = 'success', title = '', timer = 3000 }) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
    });
};

export default AlertToast;