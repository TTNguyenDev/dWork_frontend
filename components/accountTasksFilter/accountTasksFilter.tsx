import React, { useCallback, useRef } from 'react';
import { BsFilter, BsSearch } from 'react-icons/bs';
import {
    Animation,
    Button,
    Col,
    DateRangePicker,
    FlexboxGrid,
    Input,
    InputGroup,
    Stack,
} from 'rsuite';
import classes from './accountTasksFilter.module.less';
import Select from 'react-select';
import { useQuery } from 'react-query';
import { CategoryService } from '../../services/categoryService';
import { Wrapper } from '../wrapper';
import { TaskStatus } from '../../models/types/jobType';

const TASK_STATUS_SELECT_OPTIONS = [
    {
        label: 'Available',
        value: TaskStatus.AVAILABLE,
    },
    {
        label: 'Completed',
        value: TaskStatus.COMPLETED,
    },
    {
        label: 'Expired',
        value: TaskStatus.EXPIRED,
    },
];

type AccountTasksFilterProps = {
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
};

export const AccountTasksFilter: React.FunctionComponent<
    AccountTasksFilterProps
> = ({ filter, setTaskFilter, applyTaskFilter }) => {
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <Wrapper className={classes.root}>
            <div className={classes.top}>
                <InputGroup inside style={{ maxWidth: 300, marginRight: 15 }}>
                    <InputGroup.Addon>
                        <BsSearch />
                    </InputGroup.Addon>
                    <Input placeholder="Search" />
                </InputGroup>
                <div>
                    <Stack spacing={15}>
                        <Select
                            options={TASK_STATUS_SELECT_OPTIONS}
                            isSearchable={false}
                            defaultValue={TASK_STATUS_SELECT_OPTIONS[0]}
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minWidth: 120,
                                    fontWeight: 600,
                                    border: 'none',
                                    background: '#f7f7fa',
                                    color: '#575757',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                }),
                            }}
                        />
                        <Button
                            style={{ fontWeight: 600, fontSize: 14 }}
                            onClick={handleToggle}
                        >
                            <Stack>
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
                    </Stack>
                </div>
            </div>
            <Animation.Collapse className={classes.bottom} in={show}>
                {(props, ref) => <Panel {...props} ref={ref} />}
            </Animation.Collapse>
        </Wrapper>
    );
};

const Panel = React.forwardRef(
    ({ style, filter, setTaskFilter, applyTaskFilter, ...props }: any, ref) => {
        const filterRef = useRef({});
        const categoriesQuery = useQuery('categories', () =>
            CategoryService.fetchCategories()
        );

        const handleSearchInputChange = useCallback(
            (value) => {
                filterRef.current = {
                    ...filterRef.current,
                    title: value,
                };
            },
            [filterRef.current]
        );

        const handleCategorySelectChange = useCallback(
            (items) => {
                filterRef.current = {
                    ...filterRef.current,
                    categories: items.map((i: any) => i.value),
                };
            },
            [filterRef.current]
        );

        const handleApplyButtonClick = useCallback(() => {
            setTaskFilter(filterRef.current);
            applyTaskFilter();
        }, [filterRef.current]);

        const handleSortSelectChange = useCallback(({ value }) => {
            console.log(value);
            setTaskFilter({ sort: value });
            applyTaskFilter();
        }, []);

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
                    <FlexboxGrid.Item as={Col} colspan={24} md={12}>
                        <div className={classes.item_filter}>
                            <div className={classes.item_filter_label}>
                                Created
                            </div>
                            <DateRangePicker style={{ width: '100%' }} />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
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
                                placeholder="Select"
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

                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                        <div className={classes.item_filter}>
                            <div className={classes.item_filter_label}>
                                Sort By
                            </div>
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
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12}>
                        <div className={classes.item_filter}>
                            <div className={classes.item_filter_label}>
                                Deadline
                            </div>
                            <DateRangePicker style={{ width: '100%' }} />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                        <div
                            className={classes.item_filter}
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Button style={{ width: '100%', marginRight: 5 }}>
                                Clear
                            </Button>
                            <Button
                                appearance="primary"
                                style={{ width: '100%' }}
                            >
                                Apply
                            </Button>
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        );
    }
);
