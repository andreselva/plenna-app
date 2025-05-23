import React, { useRef, useState, useEffect } from 'react';

const ExpandableRow = ({ isOpen, children }) => {
    const contentRef = useRef(null);
    const [render, setRender] = useState(isOpen);

    useEffect(() => {
        const el = contentRef.current;

        if (isOpen) {
            setRender(true);
            setTimeout(() => {
                if (el) {
                    el.style.maxHeight = `${el.scrollHeight}px`;
                }
            }, 0);
        } else {
            if (el) {
                el.style.maxHeight = '0px';
            }
            const timeout = setTimeout(() => setRender(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <div
            ref={contentRef}
            style={{
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
                maxHeight: '0px',
            }}
        >
            {render && children}
        </div>
    );
};

export default ExpandableRow;