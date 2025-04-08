import AlertConfirm from "../../Components/Alerts/AlertConfirm";
import AlertToast from "../../Components/Alerts/AlertToast";

const DeleteConfirmation = (
    onDelete,
    {
        confirmTitle = 'Confirma a exclusão?',
        confirmText = 'Esta ação não pode ser desfeita!',
        confirmButtonText = 'Sim, excluir!',
        cancelButtonText = 'Cancelar',
        successMessage = 'Exclusão realizada com sucesso!',
        errorMessage = 'Erro ao realizar exclusão!'
    } = {}
) => {
    const handleDelete = async (id) => {
        const result = await AlertConfirm({
            title: confirmTitle,
            text: confirmText,
            icon: 'warning',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        });

        if (result.isConfirmed) {
            try {
                await onDelete(id);
                AlertToast({ icon: 'success', title: successMessage });
            } catch (error) {
                AlertToast({ icon: 'error', title: errorMessage });
            }
        }
    };

    return handleDelete;
};

export default DeleteConfirmation;