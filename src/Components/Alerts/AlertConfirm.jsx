import Swal from 'sweetalert2';

const AlertConfirm = async ({
    title = 'Confirma a ação?',
    text = '',
    icon = 'warning',
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
    confirmButtonText = 'Sim, confirmar!',
    cancelButtonText = 'Cancelar'
}) => {
    return await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        cancelButtonText
    });
};

export default AlertConfirm;