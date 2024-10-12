import React from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const NotificationForEmail = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center max-w-md`}>
      <Icon className="w-6 h-6 mr-3" />
      <p className="flex-grow">{message}</p>
      <button onClick={onClose} className="ml-3 focus:outline-none">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NotificationForEmail;