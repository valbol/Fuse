import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TokenDetails = (props) => {
    const [data, dataSet] = useState({ total: 0, percentage: 0 });
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(
                    `https://explorer.fuse.io/api?module=stats&action=tokensupply&contractaddress=${props.location.detailsProps.contractAddress}`
                );
                console.log(`response=${JSON.stringify(response.data)}`);
                if (response.data.result !== '0') {
                    let percentage;
                    console.log(props.location.detailsProps.balance);
                    if (props.location.detailsProps.balance !== 'undefined') {
                        percentage =
                            (props.location.detailsProps.balance * 100) /
                            response.data.result;
                    } else {
                        dataSet({
                            total: response.data.result,
                            percentage: -1,
                        });
                        return;
                    }

                    let eValue = percentage.toString().split('e');
                    let [mainValue, zeroPadding] = eValue;
                    if (eValue[0].toString().includes('.')) {
                        let leadingNum = eValue[0].toString().split('.');
                        mainValue =
                            eValue[0] * Math.pow(10, leadingNum[1].length);
                    }
                    let decimalLength = mainValue.toString().length;
                    if (Math.sign(zeroPadding) < 0) {
                        percentage =
                            '0.' +
                            mainValue
                                .toString()
                                .padStart(
                                    decimalLength + Math.abs(zeroPadding) - 1,
                                    0
                                );
                    } else {
                        percentage = mainValue
                            .toString()
                            .padEnd(decimalLength + zeroPadding, 0);
                    }
                    dataSet({ total: response.data.result, percentage });
                }
            } catch (e) {
                console.log(e);
                dataSet({ total: -1, percentage: -1 });
            }
        }
        fetchData();
    }, []);
    console.log(`data=${JSON.stringify(data)}`);
    return (
        <React.Fragment>
            <div>
                <h2>{props.location.detailsProps.name}</h2>
                <h4>
                    Contract Address:{' '}
                    {props.location.detailsProps.contractAddress}
                </h4>
                <h4>Balance: {props.location.detailsProps.balance}</h4>
                <h4>
                    TOTAL coins supply is:{' '}
                    {data.total === -1 ? 'N/A' : data.total}
                </h4>
                <h4>
                    % coins from supply is:{' '}
                    {data.percentage === -1 ? 'N/A' : data.percentage} %
                </h4>
            </div>
            <Link to={`/${props.location.detailsProps.uId}/tokens`}>
                Back to Tokens
            </Link>
        </React.Fragment>
    );
};

export default TokenDetails;
