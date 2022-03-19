import React from 'react';
import classes from './listTasks.module.less';
import { Button, Col, FlexboxGrid } from 'rsuite';
import { Job } from '../../models/types/jobType';
import { JobCard } from '../jobCard';
import { Loader } from '../loader';
import { Optional } from '../../common';
import { CardCreateTask } from '../cardCreateTask';

type ListTasksProps = {
    tasks: Optional<Job[]>;
    isLoading: boolean;
    isCreatable?: boolean;
    gridBreakpoints?: Record<string, number>;
};

export const ListTasks: React.FunctionComponent<ListTasksProps> = ({
    tasks,
    isLoading,
    isCreatable,
    gridBreakpoints,
}) => {
    return (
        <div className={classes.root}>
            <div className={classes.list_tasks_wrapper}>
                {isLoading ? (
                    <Loader />
                ) : (
                    <FlexboxGrid className={classes.list_jobs}>
                        {!isCreatable && (!tasks || !tasks.length) && (
                            <div>No tasks</div>
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
                            tasks.map((job: Job) => (
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
                                    <JobCard task={job} key={job.taskId} />
                                </FlexboxGrid.Item>
                            ))}
                    </FlexboxGrid>
                )}
                {/* <div style={{ textAlign: 'center' }}>
                    <Button
                        size="md"
                        appearance="primary"
                        onClick={fetchNextPage}
                        loading={isFetchingNextPage}
                        disabled={!hasNextPage}
                    >
                        View More
                    </Button>
                </div> */}
            </div>
        </div>
    );
};
