/*
 * Copyright (c) 2023 INPRENDE LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of INPRENDE LLC.
 * You shall not disclose such confidential information and shall use it only
 * in accordance with the terms of the license agreement you entered into with
 * INPRENDE LLC.
 */
import { openDB } from 'idb';
import {CONFIG} from "./config";

/**
 * Open the database connection.
 * @returns {Promise<IDBDatabase>} A promise that resolves to the opened database connection.
 */
const openDatabase = async () => {
    return await openDB(CONFIG.DB_NAME, CONFIG.DB_VERSION, {
        upgrade(db) {
            const store = db.createObjectStore(CONFIG.DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            store.createIndex('resource', 'resource', { unique: false });
            store.createIndex('createdAt', 'createdAt', { unique: false });
            store.createIndex('resourceId', 'resourceId', { unique: true });
            store.createIndex('resourceType', 'resourceType', { unique: false });
        },
    });
};

/**
 * Insert a library item record into the database.
 * @param {Object} record - The library item record to be inserted.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the insertion.
 */
const insertLibraryItem = async (record) => {
    try {

        //Validate record...
        if (!record || !record.resource || !record.resourceId || !record.resourceType
            || typeof record.resourceType !== 'string' || typeof record.resource !== 'string' || typeof record.resourceId !== 'number') {

            return {
                detail: `Se ha presentado un problema con el recurso. Trate más tarde.`,
                severity: 'error',
                summary: 'Recurso Inválido'
            };
        }

        const db = await openDatabase();
        const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readwrite');
        const store = tx.objectStore(CONFIG.DB_STORE_NAME);

        // To verify if the resourceId already exists in the database
        const index = store.index('resourceId');
        const existingRecord = await index.get(record.resourceId);

        if (existingRecord) {
            return {
                detail: `El recurso ya existe en la base de datos.`,
                severity: 'warn',
                summary: 'Recurso duplicado'
            };
        }

        if (!record.createdAt) {
            record.createdAt = new Date().toISOString();
        }

        await store.add(record);
        await tx.done;

        return {
            detail: 'El recurso ha sido guardado exitosamente.',
            severity: 'success',
            summary: 'Recurso almacenado'
        };
    } catch (error) {
        console.log('Error al almacenar el elemento en la biblioteca:', error);
        return {
            detail: 'Error al realizar la transacción con la base de datos.',
            severity: 'error',
            summary: 'Error de Sistema'
        };
    }
};

/**
 * Retrieve library items by their resource ID.
 * @param {number} resourceId - The resource ID of the library items.
 * @returns {Promise<Array>} A promise that resolves to an array of library items matching the specified resource ID.
 */
const getLibraryItemsByResourceId = async (resourceId) => {
    const db = await openDatabase();
    const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readonly');
    const store = tx.objectStore(CONFIG.DB_STORE_NAME);
    const index = store.index('resourceId');
    return index.getAll(resourceId);
};

/**
 * Retrieve a library item by its ID.
 * @param {number} id - The ID of the library item.
 * @returns {Promise<Object>} A promise that resolves to the library item with the specified ID.
 */
const getLibraryItemById = async (id) => {
    const db = await openDatabase();
    const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readonly');
    const store = tx.objectStore(CONFIG.DB_STORE_NAME);
    return store.get(id);
};

/**
 * Retrieve library items by their resource.
 * @param {string} resource - The resource of the library items.
 * @returns {Promise<Array>} A promise that resolves to an array of library items matching the specified resource.
 */
const getLibraryItemsByResource = async (resource) => {
    const db = await openDatabase();
    const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readonly');
    const store = tx.objectStore(CONFIG.DB_STORE_NAME);
    const index = store.index('resource');
    return index.getAll(resource);
};

/**
 * Retrieve library items by their created date.
 * @param {string} createdAt - The created date of the library items.
 * @returns {Promise<Array>} A promise that resolves to an array of library items matching the specified created date.
 */
const getLibraryItemsByCreatedAt = async (createdAt) => {
    const db = await openDatabase();
    const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readonly');
    const store = tx.objectStore(CONFIG.DB_STORE_NAME);
    const index = store.index('createdAt');
    return index.getAll(createdAt);
};

/**
 * Retrieve all library items with pagination support.
 * @param {number} pageNumber - The page number of the library items.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<Object>} A promise that resolves to an object containing the retrieved library items, pagination information, and total counts.
 */
const getAllLibraryItems = async (pageNumber, pageSize) => {
    const db = await openDatabase();
    const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readonly');
    const store = tx.objectStore(CONFIG.DB_STORE_NAME);

    const totalElements = await store.count();
    const totalPages = Math.ceil(totalElements / pageSize);

    let startIndex = 0;
    if (pageNumber >= 0) {
        startIndex = pageNumber * pageSize;
    }

    const endIndex = startIndex + pageSize;
    const last = pageNumber === totalPages - 1;

    const range = IDBKeyRange.bound(startIndex, endIndex, false, false);

    const items = await store.getAll(range);

    return { items, last, pageNumber, pageSize, totalPages, totalElements };
};

/**
 * Delete library items by their resource ID.
 * @param {number} resourceId - The resource ID of the library items to be deleted.
 * @returns {Promise<void>} A promise that resolves when the deletion is completed.
 */
const deleteLibraryItemByResourceId = async (resourceId) => {
    const db = await openDatabase();
    const tx = db.transaction(CONFIG.DB_STORE_NAME, 'readwrite');
    const store = tx.objectStore(CONFIG.DB_STORE_NAME);

    const index = store.index('resourceId');
    const items = await index.getAll(resourceId);

    if (items && items.length > 0) {
        items.forEach((item) => store.delete(item.id));
    }
};

export {
    insertLibraryItem,
    getLibraryItemById,
    getLibraryItemsByResource,
    getLibraryItemsByCreatedAt,
    getLibraryItemsByResourceId,
    deleteLibraryItemByResourceId,
    getAllLibraryItems
};

