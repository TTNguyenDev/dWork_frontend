import React from 'react';
import { BsFilter, BsSearch } from 'react-icons/bs';
import {
    Animation,
    Button,
    Col,
    Dropdown,
    FlexboxGrid,
    Grid,
    Input,
    InputGroup,
    Row,
    Stack,
} from 'rsuite';
import classes from './taskFilter.module.less';
import Select from 'react-select';
import { CategoriesListBadge } from '../categoriesListBadge';
import { useQuery } from 'react-query';
import { CategoryService } from '../../services/categoryService';

type TaskFilterProps = {};

export const TaskFilter: React.FunctionComponent<TaskFilterProps> = ({}) => {
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div>
                    <Select
                        options={[
                            {
                                label: 'Newest',
                                value: 'newest',
                            },
                        ]}
                        isSearchable={false}
                        defaultValue={{
                            label: 'Newest',
                            value: 'newest',
                        }}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        styles={{
                            control: (base) => ({
                                ...base,
                                fontWeight: 600,
                                border: 'none',
                                background: '#f7f7fa',
                                color: '#575757',
                                borderRadius: 6,
                                cursor: 'pointer',
                            }),
                        }}
                    />
                </div>
                <div>
                    <CategoriesListBadge />
                </div>
                <div>
                    <Button
                        style={{ fontWeight: 600, fontSize: 14 }}
                        onClick={handleToggle}
                    >
                        <Stack spacing={10}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <BsFilter size={20} />
                            </div>
                            <div>Filter</div>
                        </Stack>
                    </Button>
                </div>
            </div>
            <Animation.Collapse className={classes.bottom} in={show}>
                {(props, ref) => <Panel {...props} ref={ref} />}
            </Animation.Collapse>
        </div>
    );
};

const Panel = React.forwardRef(({ style, ...props }: any, ref) => {
    const categoriesQuery = useQuery('categories', () =>
        CategoryService.fetchCategories()
    );

    console.log(categoriesQuery.data);

    return (
        <div
            {...props}
            ref={ref as any}
            style={{
                paddingTop: 15,
                ...style,
            }}
        >
            <FlexboxGrid align="bottom">
                <FlexboxGrid.Item colspan={6}>
                    <div className={classes.item_filter}>
                        <div className={classes.item_filter_label}>Tags</div>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <BsSearch />
                            </InputGroup.Addon>
                            <Input />
                        </InputGroup>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <div className={classes.item_filter}>
                        <div className={classes.item_filter_label}>
                            Category
                        </div>
                        <Select
                            isClearable
                            isMulti
                            options={categoriesQuery.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            isLoading={categoriesQuery.isLoading}
                            placeholder="Choose category"
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    fontWeight: 600,
                                    border: 'none',
                                    background: '#f7f7fa',
                                    color: '#575757',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                }),
                            }}
                        />
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <div
                        className={classes.item_filter}
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Button style={{ width: '100%', marginRight: 5 }}>
                            Clear
                        </Button>
                        <Button appearance="primary" style={{ width: '100%' }}>
                            Apply
                        </Button>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
});
