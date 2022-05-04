import {
    AspectRatio,
    Box,
    Center,
    Skeleton,
    SkeletonText,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { IPFSUtils } from '../../utils/ipfsUtils';

interface HtmlIPFSProps {
    cid: string;
    queryKey?: string;
    textOnly?: boolean;
    className?: string;
}

export const HtmlIPFS: React.FunctionComponent<HtmlIPFSProps> = ({
    cid,
    queryKey = 'html_ipfs',
    className,
    textOnly,
}) => {
    const htmlQuery = useQuery(
        [queryKey, cid],
        () => IPFSUtils.getDataByCID(cid),
        {
            enabled: !!cid,
        }
    );

    return (
        <>
            <Box mb="30px">
                {htmlQuery.isLoading ? (
                    <VStack spacing="40px" align="stretch">
                        <SkeletonText noOfLines={2} spacing="15px" />
                        {!textOnly && (
                            <>
                                <Center>
                                    <AspectRatio
                                        ratio={16 / 9}
                                        maxW="400px"
                                        w="100%"
                                    >
                                        <Skeleton h="100px" />
                                    </AspectRatio>
                                </Center>
                                <SkeletonText noOfLines={3} spacing="15px" />
                            </>
                        )}
                    </VStack>
                ) : (
                    htmlQuery.data && (
                        <Box
                            className={className ? className : 'ql-editor'}
                            dangerouslySetInnerHTML={{
                                __html: textOnly
                                    ? htmlQuery.data.replace(/<(.|\n)*?>/g, ' ')
                                    : htmlQuery.data!,
                            }}
                        />
                    )
                )}
            </Box>
        </>
    );
};
