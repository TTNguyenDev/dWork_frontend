import { Skeleton, Grid, VStack } from '@chakra-ui/react';
import { useListReports } from '../../hooks';
import { ReportCard } from '../report-card';

export const ListReports = () => {
  const {
    listReportsState: { isLoading, data },
  } = useListReports();

  return (
    <>
      {isLoading && <Skeleton h="20px" />}
      {data && (
        <VStack spacing="20px" align="stretch">
          {data.map((item) => (
            <ReportCard data={item} key={item.report_id} />
          ))}
        </VStack>
      )}
    </>
  );
};
