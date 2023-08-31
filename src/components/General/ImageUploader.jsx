import React, { forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { CONSTANTS } from "../../config/global-config";
import { BsImageFill } from "react-icons/bs";

const ImageUploader = forwardRef(({ name="", label = "", required = false, maxSize}, ref) => {
    const { register, formState: { errors } } = useFormContext();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: CONSTANTS.AVAILABLE_IMAGE_FORMATS.map(format => `image/${format}`),
        multiple: false,
        maxSize: maxSize * 1024 * 1024,
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="flex flex-col gap-1">
            <label>{label}{required && "*"}</label>
            <div
                {...getRootProps()}
                className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-4"
            >
                <BsImageFill className="text-5xl text-darkblue" />
                <p className="font-semibold">Adjuntar Imagen de Portada</p>
                <p className="bg-transparent hover:bg-blue-900 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded text-xs">Subir Imagen</p>
                <p className="text-[12px] text-neutral-600 text-center">
                    Solo se permiten los formatos:
                    <br />
                    <span className="font-bold">
            {CONSTANTS.AVAILABLE_IMAGE_FORMATS.join(", ")}
          </span>
                </p>
                <p className="text-[12px] text-neutral-600 text-center">
                    Max: {CONSTANTS.MAX_IMAGE_SIZE}{CONSTANTS.IMAGE_SIZE_UNIT}
                </p>
            </div>
            {errors[name] && <p className="text-red-500 text-sm">{label} es requerido</p>}
            {files.length > 0 && (
                <aside>
                    <h4>Archivos seleccionados</h4>
                    <ul>{files}</ul>
                </aside>
            )}
            <input type="hidden" {...register(name, { required })} />
            <input type="file" {...getInputProps()} ref={ref} />
        </div>
    );
});

export default ImageUploader;
