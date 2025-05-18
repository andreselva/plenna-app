import Swal from "sweetalert2";

const SweetAlert = {
    success: (message = 'Operação realizada com sucesso!') => {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: message,
            confirmButtonText: 'OK',
        });
    },

    error: (message = 'Algo deu errado!') => {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: message,
            confirmButtonText: 'OK',
        });
    },
};

export default SweetAlert;