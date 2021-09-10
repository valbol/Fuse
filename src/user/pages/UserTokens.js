import React from 'react';
import { useParams } from 'react-router';

import TokensList from '../../tokens/components/TokensList';

const UserTokens = () => {
    const uId = useParams().userId;
    return <TokensList uId={uId} />;
};
export default UserTokens;
