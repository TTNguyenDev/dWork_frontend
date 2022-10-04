import { useQuery } from '@tanstack/react-query';
import { CachePrefixKeys } from '../constants';
import { ReportRepo } from '../repos';

export const useListReports = () => {
  const listReportsQuery = useQuery([CachePrefixKeys.REPORT], () =>
    ReportRepo.getList({
      skip: 0,
      limit: 10,
    })
  );

  return {
    listReportsState: {
      isLoading: listReportsQuery.isLoading,
      data: listReportsQuery.data,
    },
    listReportsMethods: {},
  };
};
