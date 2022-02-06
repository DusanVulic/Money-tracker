import { projectFirestore, timestamp } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

const firestoreReducer = (state, action) => {
    if (action.type === "IS_PENDING") {
        return {
            ...state,
            isPending: true,
            document: null,
            error: null,
            success: null,
        };
    }
    if (action.type === "ADDED_DOCUMENT") {
        return {
            ...state,
            isPending: false,
            document: action.payload,
            error: null,
            success: true,
        };
    }
    if (action.type === "EROR") {
        return {
            ...state,
            isPending: false,
            document: null,
            success: null,
            error: action.payload,
        };
    }
    if (action.type === "DELETE") {
        return {
            isPending: false,
            document: action.payload,
            error: null,
            success: true,
        };
    }

    return state;
};

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    //collection ref

    const ref = projectFirestore.collection(collection);

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    };

    // add document

    const addDocument = async(doc) => {
        dispatch({ type: "IS_PENDING" });
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({...doc, createdAt });
            dispatchIfNotCancelled({
                type: "ADDED_DOCUMENT",
                payload: addedDocument,
            });
        } catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: error.mesage });
        }
    };

    const deleteDocument = async(id) => {
        dispatch({ type: "IS_PENDING" });

        try {
            const deleteDocument = await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: "DELETE", payload: deleteDocument });
        } catch (error) {
            dispatchIfNotCancelled({
                type: "ERROR",
                payload: "could not delete item",
            });
        }
    };

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        };
    }, []);

    return { addDocument, deleteDocument, response };
};