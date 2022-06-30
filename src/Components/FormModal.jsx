// Imports
import { useState, Fragment, useEffect } from 'react';

// Styles
import './styles/FormModal.css';

const FormModal = ({
    title,
    description,
    errorMessage,
    autocomplete = 'off',
    onDismiss,
    onSelect,
    confirmButtonText,
    onSubmitAction,
    inputs
}) => {
    // Hooks
    // State for valid form and form errors
    const [validForm, setValidForm] = useState({
        formValid: undefined,
        formErrors: []
    });
    // Form data
    const [formData, setFormData] = useState({});

    // useEffect
    // Set default values if needed, if not values set to undefined
    useEffect(() => {
        let tags = {};
        inputs.forEach(inp => tags = { ...tags, [inp.id]: inp.defaultValue ?? undefined });
        setFormData(tags);
    }, [inputs]);

    // After validate form checks if its valid, if not show errors for 2.5s
    // Else triggers onSubmitAction()
    useEffect(() => {
        if (validForm.formValid !== undefined && !validForm.formValid)
            setTimeout(() => setValidForm({ formValid: undefined }), 2500)

        if (validForm.formValid !== undefined && validForm.formValid) {
            // Here goes onValid trigger
            if (onSubmitAction)
                onSubmitAction(formData);
            onSelect(true);
        }
    }, [validForm]);

    // Handlers
    const onSubmitHandler = e => {
        e.preventDefault();
        validateForm();
    }

    /*
    *   Validate function
    */
    // Validates if any form value is undefined or string empty
    const validateForm = () => {
        const errors = []
        for (const iterator in formData) {
            if (formData[iterator] === undefined || formData[iterator] === '') {
                errors.push(iterator);
            }
        }
        setValidForm({ formValid: errors.length === 0, formErrors: errors });
    }

    const onResponseHandler = e => {
        onSelect(e.target.value === 'true');
        onDismiss();
    }

    const onDismissHandler = _ => {
        onDismiss();
    }

    const onChangeInputHandler = e => {
        const target = e.target;
        const value =
            target.type === 'checkbox' ? target.checked :
                target.type === 'radio' ? target.value : target.value;
        const name = target.name;

        setFormData({ ...formData, [name]: value });
    }

    const propagationHandler = e => e.stopPropagation();

    // Render Section
    return (
        <div
            className="form__modal_container"
            onClick={onDismissHandler}
        >
            <div
                className='dialog'
                role="dialog"
                aria-labelledby="dialogTitle"
                aria-describedby="dialogDesc"
                onClick={propagationHandler}
            >
                <h2 className='dialog-title' id="dialogTitle"> {title} </h2>
                <p className='dialog-desc' id="dialogDesc"> {description} </p>
                <form
                    className={validForm.formValid === undefined || validForm.formValid ? "dialog__form" : "dialog__form dialog__form--invalid"}
                    autoComplete={autocomplete}
                    onSubmit={onSubmitHandler}
                >
                    {
                        inputs.map((inpt, i) =>
                            <Fragment key={`temp${i + 1}`}>
                                <label key={`label${i + 1}`} style={inpt.lbl__style} htmlFor={inpt.id}> {inpt.label} </label>
                                {
                                    inpt.input ?
                                        // In case we have input as true lets check if the multiple inputs are of radio
                                        inpt.input__type === 'radio' ?
                                            <div key={`radioG${i + 1}`} className='dialog__form__row'>
                                                {
                                                    inpt.radios__buttons.map((radio_btn, j) =>
                                                        <Fragment key={`tempDiv${j + 1}`}>
                                                            <label style={radio_btn.lbl__style} key={`lblDiv${j + 1}`} htmlFor={radio_btn.id}>{radio_btn.label}</label>
                                                            <input
                                                                /* defaultChecked={radio_btn.checked} */
                                                                type='radio'
                                                                name={inpt.id}
                                                                id={radio_btn.id}
                                                                value={radio_btn.value}
                                                                style={radio_btn.style}
                                                                key={radio_btn.id}
                                                                className='dialog__form-input'
                                                                onChange={onChangeInputHandler}
                                                            />
                                                        </Fragment>
                                                    )
                                                }
                                            </div>
                                            :
                                            // In case not lets see if its a select
                                            inpt.input__type === 'select' ?
                                                <select key={inpt.id}
                                                    name={inpt.id}
                                                    className='dialog__form-input'
                                                    style={{ paddingInline: '1em' }}
                                                    onChange={onChangeInputHandler}
                                                    defaultValue={inpt.defaultValue}>
                                                    {
                                                        inpt.options.map((opt, j) =>
                                                            <option
                                                                hidden={opt.hidden}
                                                                value={opt.value}
                                                                id={opt.id}
                                                                style={opt.style}
                                                                key={`SelectT${opt.value + j}`}
                                                                className='dialog__form-input'
                                                            >
                                                                {opt.name}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                                // In case not lets return null
                                                : <p>Error in input__type, please check your sintax</p>
                                        :
                                        inpt.input__type === 'textarea' ?
                                            <textarea
                                                defaultValue={inpt.defaultValue}
                                                id={inpt.id}
                                                key={inpt.id}
                                                name={inpt.id}
                                                style={inpt.style}
                                                className='dialog__form-input'
                                                onChange={onChangeInputHandler} />
                                            :
                                            <input
                                                defaultValue={inpt.defaultValue}
                                                id={inpt.id}
                                                key={inpt.id}
                                                name={inpt.id}
                                                style={inpt.style}
                                                type={inpt.input__type}
                                                min={inpt.input__type === 'number' ? 0 : null}
                                                pattern={inpt.input__type === 'number' ? '[0-9]*' : null}
                                                className='dialog__form-input'
                                                onChange={onChangeInputHandler} />


                                }
                            </Fragment>
                        )
                    }

                    {
                        validForm.formValid !== undefined && !validForm.formValid &&
                        <p className="dialog__form__exception">
                            {errorMessage || 'Hubo un error, verifica los campos'}<br />{validForm.formErrors.join(', ')}
                        </p>
                    }

                    <div className="dialog-buttons">
                        <button type="submit" value={true} className='dialog-btn dialog-confirm'> {confirmButtonText || `Aceptar`} </button>
                        <button type='button' onClick={onResponseHandler} value={false} className='dialog-btn dialog-cancel'> Cancelar </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormModal;