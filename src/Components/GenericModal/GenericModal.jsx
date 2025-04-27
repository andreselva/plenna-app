import './GenericModal.css';

const GenericModal = ({
    isOpen,
    title,
    formFields,
    onSubmit,
    onCancel,
    submitButtonText = 'Salvar',
    cancelButtonText = 'Cancelar',
    width = '500px', // Largura padrão
    height = 'auto', // Altura padrão
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{ width: width, height: height }} // Estilo dinâmico
            >
                <h2>{title}</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    {formFields.map((group, groupIndex) => (
                        <div className="form-group-row" key={groupIndex}>
                            {group.fields.map((field, fieldIndex) => (
                                <div
                                    className={`form-group ${field.size || 'full-width'}`}
                                    key={fieldIndex}
                                >
                                    <label htmlFor={field.id}>{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.id}
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                            required={field.required}
                                        >
                                            <option value="">
                                                {field.placeholder}
                                            </option>
                                            {field.options?.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.id}
                                            type={field.type}
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            step={field.step}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="modal-buttons">
                        <button type="submit" className="btn-primary">
                            {submitButtonText}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary"
                        >
                            {cancelButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericModal;