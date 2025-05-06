import './ToggleSwitch.css';

const ToggleSwitch = ({ id, label, checked, onChange, disabled }) => {
    return (
        <div className="toggle-switch">
            {label && <label htmlFor={id} className="toggle-label">{label}</label>}
            <label className="switch">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <span className="slider" />
            </label>
        </div>
    );
};

export default ToggleSwitch;
