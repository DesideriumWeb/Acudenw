import React from "react";
import PropTypes from "prop-types";
import { CONSTANTS } from "../../config/global-config";

const ImageDropZone = ({ onFileSelect }) => {
    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (
            CONSTANTS.AVAILABLE_IMAGE_FORMATS.includes(file.type) &&
            file.size <= CONSTANTS.MAX_IMAGE_SIZE
        ) {
            const fileUrl = URL.createObjectURL(file);
            onFileSelect(fileUrl);
        } else {
            console.error("Invalid file");
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (
            CONSTANTS.AVAILABLE_IMAGE_FORMATS.includes(file.type) &&
            file.size <= CONSTANTS.MAX_IMAGE_SIZE
        ) {
            const fileUrl = URL.createObjectURL(file);
            onFileSelect(fileUrl);
        } else {
            console.error("Invalid file");
        }
    };

    return (
        <div
            className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-4"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <BsImageFill className="text-5xl text-darkblue" />
            <p className="font-semibold">Adjuntar Imagen de Portada</p>

            <label htmlFor="image-upload" className="card-btn-outline">
                Buscar Imagen
            </label>

            <input
                type="file"
                id="image-upload"
                accept={CONSTANTS.AVAILABLE_IMAGE_FORMATS.join(",")}
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />

            <p className="text-[12px] text-neutral-600 text-center">
                Solo se permiten los formatos:
                <br />
                <span className="font-bold">
          {CONSTANTS.AVAILABLE_IMAGE_FORMATS.join(", ")}
        </span>
            </p>
            <p className="text-[12px] text-neutral-600 text-center">
                Max: {CONSTANTS.MAX_IMAGE_SIZE}
                {CONSTANTS.IMAGE_SIZE_UNIT}
            </p>
        </div>
    );
};

ImageDropZone.propTypes = {
    onFileSelect: PropTypes.func.isRequired,
};

export default ImageDropZone;
