import React from 'react';
import { Link } from 'react-router-dom';

import './TokensItem.css';

const TokenItem = (props) => {
    return (
        <React.Fragment>
            <li className='token-item'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link
                                    to={{
                                        pathname: `/details/${props.contractAddress}`,
                                        detailsProps: {
                                            name: `${props.name}`,
                                            contractAddress: `${props.contractAddress}`,
                                            balance: `${props.balance}`,
                                            uId: `${props.uId}`,
                                        },
                                    }}>
                                    <h3> {props.name}</h3>
                                </Link>
                                <p>
                                    {props.type} {props.contractAddress}
                                </p>
                            </td>
                            <td>
                                <p>
                                    <b>
                                        {props.balance} {props.symbol}
                                    </b>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </React.Fragment>
    );
};

export default TokenItem;
