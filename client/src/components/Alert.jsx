import PropTypes from 'prop-types';

const Alert = ({ message, type, onClose }) => {
  // Set color styles based on the alert type (success or error)
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700 z-50';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700 z-50';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700 z-50';
    }
  };

  return (
    <div className={`fixed top-5 right-5 max-w-sm w-full border-t-4 rounded-b-lg shadow-lg ${getAlertStyle()} px-4 mt-16 py-3`} role="alert">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {type === 'success' ? (
            <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-red-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
            </svg>
          )}
          <span className="ml-2 text-lg font-medium">{message}</span>
        </div>
        <button onClick={onClose} className="text-lg font-semibold text-gray-600 hover:text-gray-800">
          &times;
        </button>
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
