import React from "react";
import PropTypes from "prop-types";
import {BsImageFill} from "react-icons/bs";

const ImagePreview = ({ file }) => {
    return (
        <div className="flex flex-col items-center gap-3">
            {file ? (
                <img src={file} alt="Preview" className="w-full" />
            ) : (
                <BsImageFill className="text-5xl text-neutral-400" />
            )}

            <p className="font-semibold">
                {file ? "Imagen seleccionada" : "Adjuntar Imagen de Portada"}
            </p>
        </div>
    );
};

ImagePreview.propTypes = {
    file: PropTypes.string,
};

export default ImagePreview;
