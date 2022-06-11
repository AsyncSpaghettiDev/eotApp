// Imports
import { useState } from 'react';

// Components
import ConfirmModal from '../Components/ConfirmModal.jsx';

// Hook
const useConfirmModal = () => {
    // Hooks
    const [confirmResponse, setConfirmResponse] = useState(undefined);
    const [showConfirm, setShowConfirm] = useState(false);
    
    // Functions
    const unshowConfirmHandler = () => setShowConfirm(false);
    const resetResponse = () => setConfirmResponse(undefined);

    // Render Function
    const showModal = (title, description) => showConfirm ? <ConfirmModal
        title={title}
        description={description}
        onDismiss={unshowConfirmHandler}
        onSelect={setConfirmResponse}
    /> : null;

    return {
        showModal,
        setShowConfirm,
        confirmResponse,
        resetResponse
    }
}

export default useConfirmModal;