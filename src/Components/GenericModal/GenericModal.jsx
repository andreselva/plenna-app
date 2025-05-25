import './GenericModal.css';
import ToggleSwitch from '../ToogleSwitch/ToggleSwitch';

const GenericModal = ({
    isOpen,
    title,
    formFields,
    onSubmit,
    onCancel,
    submitButtonText = 'Salvar',
    cancelButtonText = 'Cancelar',
    width = '500px',
    height = 'auto',
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{ width: width, height: height }}
            >
                <h2>{title}</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    {formFields.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            {/* LINHA ADICIONADA: Renderiza o título da seção se ele existir */}
                            {group.title && <h3 className="modal-section-title">{group.title}</h3>}

                            <div className="form-group-row">
                                {group.fields.map((field, fieldIndex) => (
                                    <div
                                        className={`form-group ${field.size || 'full-width'}`}
                                        key={fieldIndex}
                                    >
                                        {field.type === 'toggle' ? (
                                            <ToggleSwitch
                                                id={field.id}
                                                label={field.label}
                                                checked={field.value}
                                                onChange={field.onChange}
                                                disabled={field.disabled}
                                            />
                                        ) : field.type === 'select' ? (
                                            <>
                                                <label htmlFor={field.id}>{field.label}</label>
                                                <select
                                                    id={field.id}
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(e.target.value)
                                                    }
                                                    required={field.required}
                                                    disabled={field.disabled}
                                                >
                                                    {field.placeholder && (
                                                        <option value="">
                                                            {field.placeholder}
                                                        </option>
                                                    )}
                                                    {field.options?.map((option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor={field.id}>{field.label}</label>
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
                                                    disabled={field.disabled}
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
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