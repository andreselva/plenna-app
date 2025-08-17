import { SquarePen } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import './ActionDropdown.css';

export const ActionDropdown = ({ actions = [], buttonLabel = <SquarePen width='18px' height='18px' /> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, dropdownRef]);

    if (!actions || actions.length === 0) {
        return null;
    }

    return (
        <div className="action-dropdown-container" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="action-dropdown-button"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {buttonLabel}
            </button>
            {isOpen && (
                <ul className="action-dropdown-menu" role="menu">
                    {actions.map((actionItem, index) => {
                        if (actionItem.isDivider) {
                            return <hr key={`divider-${index}`} className="action-dropdown-divider" />;
                        }

                        let itemClasses = "action-dropdown-menu-item";
                        if (actionItem.disabled) {
                            itemClasses += " action-dropdown-menu-item-disabled";
                        }
                        
                        return (
                            <li
                                key={actionItem.text || `action-${index}`}
                                className={itemClasses}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!actionItem.disabled && typeof actionItem.handler === 'function') {
                                        actionItem.handler();
                                        setIsOpen(false);
                                    }
                                }}
                                role="menuitem"
                                tabIndex={actionItem.disabled ? -1 : 0}
                                onKeyDown={(e) => {
                                    if (!actionItem.disabled && (e.key === 'Enter' || e.key === ' ')) {
                                        e.preventDefault();
                                        if (typeof actionItem.handler === 'function') {
                                            actionItem.handler();
                                            setIsOpen(false);
                                        }
                                    }
                                }}
                                aria-disabled={actionItem.disabled ? 'true' : 'false'}
                            >
                                {actionItem.icon && <span className="action-dropdown-icon">{actionItem.icon}</span>}
                                {actionItem.label || actionItem.text}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};