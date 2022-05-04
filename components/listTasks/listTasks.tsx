import React from 'react';
import classes from './listTasks.module.less';
import { Button, Col, FlexboxGrid } from 'rsuite';
import { Task } from '../../models/types/jobType';
import { JobCard } from '../jobCard';
import { Loader } from '../loader';
import { Optional } from '../../common';
import { CardCreateTask } from '../cardCreateTask';

type ListTasksProps = {
    tasks: Optional<Task[]>;
    isLoading: boolean;
    isCreatable?: boolean;
    gridBreakpoints?: Record<string, number>;
    fetchNextPage: any;
    isFetchingNextPage: boolean;
    hasNextPage: Optional<boolean>;
};

export const ListTasks: React.FunctionComponent<ListTasksProps> = ({
    tasks,
    isLoading,
    isCreatable,
    gridBreakpoints,

    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
}) => {
    return (
        <div className={classes.root}>
            <div className={classes.list_tasks_wrapper}>
                {isLoading || !tasks ? (
                    <Loader />
                ) : (
                    <FlexboxGrid className={classes.list_jobs}>
                        {!isCreatable && !tasks.length && (
                            <div className={classes.empty_list}>No tasks</div>
                        )}
                        {isCreatable && (
                            <FlexboxGrid.Item
                                as={Col}
                                lg={gridBreakpoints?.lg ?? 6}
                                md={gridBreakpoints?.md ?? 8}
                                sm={gridBreakpoints?.sm ?? 12}
                                xs={gridBreakpoints?.xs ?? 24}
                                colspan={24}
                                style={{
                                    padding: '0 10px',
                                    marginBottom: 20,
                                }}
                            >
                                <CardCreateTask />
                            </FlexboxGrid.Item>
                        )}
                        {tasks &&
                            !!tasks.length &&
                            tasks.map((task: Task) => (
                                <FlexboxGrid.Item
                                    key={task.id}
                                    as={Col}
                                    lg={gridBreakpoints?.lg ?? 6}
                                    md={gridBreakpoints?.md ?? 8}
                                    sm={gridBreakpoints?.sm ?? 12}
                                    xs={gridBreakpoints?.xs ?? 24}
                                    colspan={24}
                                    style={{
                                        padding: '0 10px',
                                        marginBottom: 20,
                                    }}
                                >
                                    <JobCard task={task} key={task.taskId} />
                                </FlexboxGrid.Item>
                            ))}
                    </FlexboxGrid>
                )}
                {tasks && !!tasks.length && (
                    <div style={{ textAlign: 'center', marginBottom: 30 }}>
                        <Button
                            size="md"
                            appearance="primary"
                            onClick={fetchNextPage}
                            loading={isFetchingNextPage}
                            disabled={!hasNextPage}
                        >
                            View More
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
