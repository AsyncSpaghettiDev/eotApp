// Imports
import { useState } from "react";

// Components
import FormModal from "../Components/FormModal.jsx";

// Hook
const useFormModal = () => {
    // Hooks
    const [formResponse, setFormResponse] = useState(undefined);
    const [showForm, setShowForm] = useState(false);

    // Functions
    const unshowFormHandler = () => setShowForm(false);
    const resetFormResponse = () => setFormResponse(undefined);

    // Render function
    const showFormModal = ({ title, description, errorMessage, inputs, confirmButtonText, onSubmitAction }) => showForm ? <FormModal
        title={title}
        description={description}
        errorMessage={errorMessage}
        onDismiss={unshowFormHandler}
        onSelect={setFormResponse}
        confirmButtonText={confirmButtonText}
        inputs={inputs}
        onSubmitAction={onSubmitAction}
    /> : null;

    return {
        showFormModal,
        setShowForm,
        formResponse,
        resetFormResponse
    }
}

export default useFormModal;