import React from 'react';
import classes from './listTasks.module.less';
import { Button, Col, FlexboxGrid } from 'rsuite';
import { Job } from '../../models/types/jobType';
import { JobCard } from '../jobCard';
import { Loader } from '../loader';
import { Optional } from '../../common';

type ListTasksProps = {
    tasks: Optional<Job[]>;
    isLoading: boolean;
};

export const ListTasks: React.FunctionComponent<ListTasksProps> = ({
    tasks,
    isLoading,
}) => {
    return (
        <div className={classes.root}>
            <div className={classes.list_tasks_wrapper}>
                {isLoading ? (
                    <Loader />
                ) : (
                    <FlexboxGrid className={classes.list_jobs}>
                        {(!tasks || !tasks.length) && <div>No tasks</div>}
                        {tasks &&
                            !!tasks.length &&
                            tasks.map((job: Job) => (
                                <FlexboxGrid.Item
                                    as={Col}
                                    lg={6}
                                    md={8}
                                    sm={12}
                                    xs={24}
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
