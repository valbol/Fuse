import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TokenItem from './TokenItem';

const TENS = 10;

const TokensList = (props) => {
    const [data, dataSet] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(
                    `https://explorer.fuse.io/api?module=account&action=tokenlist&address=${props.uId}`
                );
                console.log(response.data.result);
                dataSet(response.data.result);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    console.log(JSON.stringify(data));
    const modifiedData = data.map((item) => {
        let balance;
        if (item.decimals > 0) {
            console.log(Math.pow(TENS, item.decimals));
            balance = parseInt(item.balance) / Math.pow(TENS, item.decimals);
        }
        return {
            ...item,
            balance,
        };
    });
    return (
        <ul className='tokens-list'>
            {modifiedData.map((token) => (
                <TokenItem
                    key={token.contractAddress}
                    uId={props.uId}
                    balance={token.balance}
                    contractAddress={token.contractAddress}
                    decimals={token.decimals}
                    name={token.name}
                    symbol={token.symbol}
                    type={token.type}
                />
            ))}
        </ul>
    );
};

export default TokensList;
