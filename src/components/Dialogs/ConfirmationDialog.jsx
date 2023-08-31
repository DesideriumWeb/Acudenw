import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const ConfirmationDialog = ({ visible = false, message, confirmAction, cancelAction }) => {

    const [dialogVisible, setDialogVisible] = useState(visible);

    const onHide = () => {
        setDialogVisible(false);
        if (cancelAction) {
            cancelAction();
        }
    };

    const onConfirm = () => {
        setDialogVisible(false);
        if (confirmAction) {
            confirmAction();
        }
    };

    return (
        <Dialog visible={dialogVisible} onHide={onHide} header="Confirmación">
            <div className="flex flex-col items-center justify-center">
                <RiCheckboxCircleFill size={48} color="#008000" />
                <div className="mt-4">{message}</div>
            </div>
            <div className="p-dialog-footer">
                <Button label="Cancelar" className="p-button-text" onClick={onHide} />
                <Button label="Confirmar" className="p-button-primary" onClick={onConfirm} />
            </div>
        </Dialog>
    );
};

export default ConfirmationDialog;
