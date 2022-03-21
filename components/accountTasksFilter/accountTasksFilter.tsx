import React from 'react';
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

type AccountTasksFilterProps = {};

export const AccountTasksFilter: React.FunctionComponent<
    AccountTasksFilterProps
> = ({}) => {
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
                            options={[
                                {
                                    label: 'Available',
                                    value: 'available',
                                },
                                {
                                    label: 'Processing',
                                    value: 'processing',
                                },
                                {
                                    label: 'Completed',
                                    value: 'completed',
                                },
                            ]}
                            isSearchable={false}
                            defaultValue={{
                                label: 'Available',
                                value: 'available',
                            }}
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

const Panel = React.forwardRef(({ style, ...props }: any, ref) => {
    const categoriesQuery = useQuery('categories', () =>
        CategoryService.fetchCategories()
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
                        <div className={classes.item_filter_label}>Created</div>
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
                        <div className={classes.item_filter_label}>Sort By</div>
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
                        <Button appearance="primary" style={{ width: '100%' }}>
                            Apply
                        </Button>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
});
