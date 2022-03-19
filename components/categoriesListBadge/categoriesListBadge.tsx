import React from 'react';
import { BsFilter, BsSearch } from 'react-icons/bs';
import {
    Animation,
    Button,
    Col,
    Dropdown,
    Grid,
    Input,
    InputGroup,
    Row,
    Stack,
} from 'rsuite';
import classes from './categoriesListBadge.module.less';
import Select from 'react-select';
import { useQuery } from 'react-query';
import { CategoryService } from '../../services/categoryService';
import { useSwipeable } from 'react-swipeable';

type CategoriesListBadgeProps = {};

export const CategoriesListBadge: React.FunctionComponent<
    CategoriesListBadgeProps
> = ({}) => {
    const categoriesQuery = useQuery('categories', () =>
        CategoryService.fetchCategories()
    );

    if (categoriesQuery.isLoading) return null;

    return (
        <Stack spacing={8}>
            <Button
                className={classes.category_badge}
                appearance="subtle"
                active
            >
                All
            </Button>
            {categoriesQuery.data?.map((category) => (
                <Button className={classes.category_badge} appearance="subtle">
                    {category.name}
                </Button>
            ))}
        </Stack>
    );
};
