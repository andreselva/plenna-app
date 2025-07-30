import AlertConfirm from "../../Components/Alerts/AlertConfirm";

const DeleteConfirmation = (
    onDelete,
    {
        confirmTitle = 'Confirma a exclusão?',
        confirmText = 'Esta ação não pode ser desfeita!',
        confirmButtonText = 'Sim, excluir!',
        cancelButtonText = 'Cancelar',
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
            await onDelete(id);
        }
    };

    return handleDelete;
};

export default DeleteConfirmation;