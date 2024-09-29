"use client";

import { useState } from 'react';

// Define prop types for the component
interface ToastProps {
    messageInToast: string;
    typeOfColor: string;
    message: string;
}

export function Toast({ messageInToast, typeOfColor, message }: ToastProps) {
    // Initialize toasts state as an empty array with proper typing
    const [toasts, setToasts] = useState<Array<{ message: string; type: string }>>([]);

    // Function to create a new toast notification
    function createNotification() {
        const newToast = {
            message: messageInToast,
            type: typeOfColor,
        };

        // Add the new toast to the existing list of toasts
        setToasts((prevToasts) => [...prevToasts, newToast]);

        // Remove the toast after 2 seconds
        setTimeout(() => {
            removeToast(newToast);
        }, 2000);
    }

    // Function to remove a specific toast
    function removeToast(toastToRemove: { message: string; type: string }) {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast !== toastToRemove));
    }

    return (
        <>
            {/* Toast container */}
            <div id="toasts" className="toast-container">
                {toasts.map((toast, index) => (
                    <div key={index} className={`toast ${toast.type}`}>
                        {toast.message}
                    </div>
                ))}
            </div>

            {/* Button to trigger notifications */}
            <button className="btn" onClick={createNotification}>
                {message}
            </button>
        </>
    );
}

export default Toast;
