import React from 'react';
import './GenericModal.css';
import ToggleSwitch from '../ToogleSwitch/ToggleSwitch';
import Loader from '../../Components/Loader/Loader';

const GenericModal = ({
    isOpen,
    title,
    children,
    formFields = [],
    onSubmit,
    onCancel,
    submitButtonText = 'Salvar',
    cancelButtonText = 'Cancelar',
    hideSubmitButton = false,
    width = '500px',
    height = 'auto',
    loading = false
}) => {
    if (!isOpen) {
        return null;
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    };
    
    const handleSubmitClick = () => {
        if (onSubmit) {
            onSubmit();
        }
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="modal-content"
                style={{ width: width, height: height }}
                onClick={(e) => e.stopPropagation()}
                >
                {loading && (
                    <div className="modal-loader-overlay">
                        <Loader />
                    </div>
                )}
                {title && <h2 className="modal-title">{title}</h2>}

                {children ? (
                    <div className="modal-body">
                        {children}
                    </div>
                ) : (
                    <div className="modal-body">
                        <form id="generic-modal-form" onSubmit={handleFormSubmit}>
                            {formFields.map((group, groupIndex) => (
                                <div key={groupIndex}>
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
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            required={field.required}
                                                            disabled={field.disabled}
                                                        >
                                                            {field.placeholder && <option value="">{field.placeholder}</option>}
                                                            {field.options?.map((option) => (
                                                                <option key={option.value} value={option.value}>
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
                                                            onChange={(e) => field.onChange(e.target.value)}
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
                        </form>
                    </div>
                )}

                <div className="modal-buttons">
                    {!hideSubmitButton && (
                         <button 
                            type={children ? 'button' : 'submit'}
                            form={children ? undefined : 'generic-modal-form'}
                            className="btn-primary" 
                            onClick={children ? handleSubmitClick : undefined}
                         >
                            {submitButtonText}
                        </button>
                    )}
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        {cancelButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenericModal;