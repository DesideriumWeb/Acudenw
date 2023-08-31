/*
Copyright (c) 2023 INPRENDE LLC. All rights reserved.
This software is the confidential and proprietary information of INPRENDE LLC.
You shall not disclose such confidential information and shall use it only
in accordance with the terms of the license agreement you entered into with
INPRENDE LLC.
*/

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { RiErrorWarningLine } from 'react-icons/ri';

const MessageDialog = ({ message, title, confirmAction, onHide }) => {

    return (
        <Dialog visible={true} onHide={onHide} header={title}>
            <div className="flex flex-row items-center justify-center">
                <RiErrorWarningLine size={48} color='red' />
                <div className="mt-4">{message}</div>
            </div>
            <div className="flex justify-end inset-x-0 bottom-0">
                <Button label="Regresar" onClick={confirmAction} />
            </div>
        </Dialog>
    );
};

export default MessageDialog;
