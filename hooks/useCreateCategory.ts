import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
    CategoryService,
    CreateCategoryInput,
} from '../services/categoryService';

export type UseCreateCategoryOutput = {
    createCategoryLoading: boolean;
    handleCreateCategory: (payload: CreateCategoryInput) => void;
};

export const useCreateCategory = (): UseCreateCategoryOutput => {
    const queryClient = useQueryClient();

    const [createCategoryLoading, setCreateCategoryLoading] = useState(false);

    const handleCreateCategory = useCallback(
        async (payload: CreateCategoryInput) => {
            setCreateCategoryLoading(true);
            await CategoryService.createCategory(payload);
            queryClient.invalidateQueries('categories');
            setCreateCategoryLoading(false);
        },
        []
    );

    return {
        createCategoryLoading,
        handleCreateCategory,
    };
};
