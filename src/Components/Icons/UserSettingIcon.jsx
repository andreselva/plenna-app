import UserSettingSVG from '../../assets/icons/user-settings.svg?react';
import './Icon.css';

export const UserSettingsIcon = () => {
    return (
        <div>
            <UserSettingSVG className='icon' style={{ color: '#ffffff', width: "25px", height: "25px", opacity: "0.6", padding: '4px 4px 4px 4px' }} />
        </div>
    );
};
