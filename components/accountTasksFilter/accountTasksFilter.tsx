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
import { SORT_SELECT_OPTIONS } from '../tasksFilter';
import moment from 'moment';

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
    filterReady: boolean;
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
};

export const AccountTasksFilter: React.FunctionComponent<
    AccountTasksFilterProps
> = ({ filterReady, filter, setTaskFilter, applyTaskFilter }) => {
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    const timeoutSearchInputRef = React.useRef<NodeJS.Timeout>();
    const handleSearchInputChange = React.useCallback((value) => {
        if (timeoutSearchInputRef.current !== undefined)
            clearTimeout(timeoutSearchInputRef.current);

        timeoutSearchInputRef.current = setTimeout(() => {
            setTaskFilter({ title: value });
            applyTaskFilter();
        }, 200);
    }, []);

    const handleStatusSelectChange = useCallback((item) => {
        switch (item.value) {
            case TaskStatus.AVAILABLE:
                setTaskFilter({
                    status: TaskStatus.AVAILABLE,
                    maxAvailableUntil: '',
                    minAvailableUntil: Date.now(),
                });
                applyTaskFilter();
                break;
            case TaskStatus.COMPLETED:
                setTaskFilter({
                    status: TaskStatus.COMPLETED,
                    maxAvailableUntil: '',
                    minAvailableUntil: '',
                });
                applyTaskFilter();
                break;
            case TaskStatus.EXPIRED:
                setTaskFilter({
                    status: TaskStatus.EXPIRED,
                    maxAvailableUntil: Date.now(),
                    minAvailableUntil: '',
                });
                applyTaskFilter();
                break;
        }
    }, []);

    if (!filterReady) return null;

    return (
        <Wrapper className={classes.root}>
            <form>
                <div className={classes.top}>
                    <InputGroup
                        inside
                        style={{ maxWidth: 300, marginRight: 15 }}
                    >
                        <InputGroup.Addon>
                            <BsSearch />
                        </InputGroup.Addon>
                        <Input
                            placeholder="Search"
                            onChange={handleSearchInputChange}
                            defaultValue={filter.title}
                        />
                    </InputGroup>
                    <div>
                        <Stack spacing={15}>
                            <Select
                                options={TASK_STATUS_SELECT_OPTIONS}
                                isSearchable={false}
                                defaultValue={
                                    filter.status
                                        ? TASK_STATUS_SELECT_OPTIONS.find(
                                              (o) => o.value === filter.status
                                          )
                                        : TASK_STATUS_SELECT_OPTIONS[0]
                                }
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
                                onChange={handleStatusSelectChange}
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
                    {(props, ref) => (
                        <Panel
                            {...props}
                            ref={ref}
                            filter={filter}
                            setTaskFilter={setTaskFilter}
                            applyTaskFilter={applyTaskFilter}
                        />
                    )}
                </Animation.Collapse>
            </form>
        </Wrapper>
    );
};

const Panel = React.forwardRef(
    ({ style, filter, setTaskFilter, applyTaskFilter, ...props }: any, ref) => {
        const filterRef = useRef<any>({});
        const categoriesQuery = useQuery('categories', () =>
            CategoryService.fetchCategories()
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

        const handleSortSelectChange = useCallback(({ value }) => {
            filterRef.current = {
                ...filterRef.current,
                sort: value,
            };
        }, []);

        const handleCreatedDatePickerChange = useCallback(
            (values) => {
                setCreatedAtDatePickerValue(values);
                if (values) {
                    const startTime = moment(values[0])
                        .set('hours', 0)
                        .set('minutes', 0)
                        .set('second', 0)
                        .valueOf();

                    const endTime = moment(values[1])
                        .set('hours', 23)
                        .set('minutes', 59)
                        .set('second', 59)
                        .valueOf();

                    setTaskFilter({
                        ...filterRef.current,
                        minCreatedAt: startTime,
                        maxCreatedAt: endTime,
                    });
                } else {
                    setTaskFilter({
                        ...filterRef.current,
                        minCreatedAt: '',
                        maxCreatedAt: '',
                    });
                }
            },
            [filterRef.current]
        );

        const handleAvailableUntilPickerChange = useCallback(
            (values) => {
                setAvailableUntilDatePickerValue(values);
                if (values) {
                    const startTime = moment(values[0])
                        .set('hours', 0)
                        .set('minutes', 0)
                        .set('second', 0)
                        .valueOf();

                    const endTime = moment(values[1])
                        .set('hours', 23)
                        .set('minutes', 59)
                        .set('second', 59)
                        .valueOf();

                    setTaskFilter({
                        ...filterRef.current,
                        minAvailableUntil: startTime,
                        maxAvailableUntil: endTime,
                    });
                } else {
                    setTaskFilter({
                        ...filterRef.current,
                        minAvailableUntil: '',
                        maxAvailableUntil:
                            filter.status === TaskStatus.EXPIRED
                                ? Date.now()
                                : '',
                    });
                }
            },
            [filterRef.current, filter]
        );

        const handleApplyButtonClick = useCallback(() => {
            setTaskFilter(filterRef.current);
            applyTaskFilter();
        }, [filterRef.current]);

        const handleClearButtonClick = useCallback(() => {
            categoriesSelectRef.current.clearValue();
            setCreatedAtDatePickerValue([]);
            setAvailableUntilDatePickerValue([]);
            console.log(filterRef);
            setTaskFilter({
                ...filterRef.current,
                title: '',
                categories: '',
                minCreatedAt: '',
                maxCreatedAt: '',
                minAvailableUntil: '',
                maxAvailableUntil:
                    filter.status === TaskStatus.EXPIRED ? Date.now() : '',
            });
            applyTaskFilter();
        }, [filterRef.current, filter]);

        const categorySelectOptions = React.useMemo(
            () =>
                categoriesQuery.data?.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
            [categoriesQuery.data]
        );

        const categoriesSelectRef = React.useRef<any>();

        const [createdAtDatePickerValue, setCreatedAtDatePickerValue] =
            React.useState<any>(
                filter.minCreatedAt && filter.maxCreatedAt
                    ? [
                          new Date(Number(filter.minCreatedAt)),
                          new Date(Number(filter.maxCreatedAt)),
                      ]
                    : []
            );
        const [
            availableUntilDatePickerValue,
            setAvailableUntilDatePickerValue,
        ] = React.useState<any>(
            filter.minAvailableUntil && filter.maxAvailableUntil
                ? [
                      new Date(Number(filter.minAvailableUntil)),
                      new Date(Number(filter.maxAvailableUntil)),
                  ]
                : []
        );

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
                            <DateRangePicker
                                style={{ width: '100%' }}
                                value={createdAtDatePickerValue}
                                onChange={handleCreatedDatePickerChange}
                            />
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
                                options={categorySelectOptions}
                                defaultValue={
                                    filter.categories
                                        ? categorySelectOptions?.filter(
                                              (item) =>
                                                  filter.categories.includes(
                                                      item.value
                                                  )
                                          )
                                        : undefined
                                }
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
                                onChange={handleCategorySelectChange}
                                ref={categoriesSelectRef}
                            />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                        <div className={classes.item_filter}>
                            <div className={classes.item_filter_label}>
                                Sort By
                            </div>
                            <Select
                                options={SORT_SELECT_OPTIONS}
                                isSearchable={false}
                                defaultValue={
                                    filter.sort
                                        ? SORT_SELECT_OPTIONS.find(
                                              (o) => o.value === filter.sort
                                          )
                                        : SORT_SELECT_OPTIONS[0]
                                }
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
                                onChange={handleSortSelectChange}
                            />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12}>
                        <div className={classes.item_filter}>
                            <div className={classes.item_filter_label}>
                                Deadline
                            </div>
                            <DateRangePicker
                                style={{ width: '100%' }}
                                value={availableUntilDatePickerValue}
                                onChange={handleAvailableUntilPickerChange}
                            />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                        <div
                            className={classes.item_filter}
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Button
                                type="reset"
                                style={{ width: '100%', marginRight: 5 }}
                                onClick={handleClearButtonClick}
                            >
                                Clear
                            </Button>
                            <Button
                                appearance="primary"
                                style={{ width: '100%' }}
                                onClick={handleApplyButtonClick}
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
