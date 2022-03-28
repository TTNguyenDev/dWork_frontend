import React from 'react';
import { Button, Stack } from 'rsuite';
import classes from './categoriesListBadge.module.less';
import { useQuery } from 'react-query';
import { CategoryService } from '../../services/categoryService';
import { Optional } from '../../common';

type CategoriesListBadgeProps = {
    categoryActive: Optional<string>;
    setCategoryActive: (categoryId: string) => void;
};

export const CategoriesListBadge: React.FunctionComponent<
    CategoriesListBadgeProps
> = ({ categoryActive, setCategoryActive }) => {
    const categoriesQuery = useQuery('categories', () =>
        CategoryService.fetchCategories()
    );

    if (categoriesQuery.isLoading) return null;

    return (
        <Stack spacing={8}>
            <Button
                className={classes.category_badge}
                appearance="subtle"
                active={!categoryActive}
                onClick={() => setCategoryActive('')}
            >
                All
            </Button>
            {categoriesQuery.data?.map((category) => (
                <Button
                    key={category.id}
                    className={classes.category_badge}
                    appearance="subtle"
                    active={categoryActive === category.id}
                    onClick={() => setCategoryActive(category.id)}
                >
                    {category.name}
                </Button>
            ))}
        </Stack>
    );
};
