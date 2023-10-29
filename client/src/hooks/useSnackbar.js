import { useState } from 'react';

function useSnackbar() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  const showSuccess = (message) => {
    setSuccess(true);
    setSuccessMsg(message);
  };

  const showError = (message) => {
    setError(true);
    setErrorMsg(message);
  };

  return {
    success,
    error,
    successMsg,
    errorMsg,
    handleClose,
    showSuccess,
    showError,
  };
}

export default useSnackbar;
