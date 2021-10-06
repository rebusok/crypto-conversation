import React from 'react';
import {DisplayResultProps} from './DisplayResult.props';

const DisplayResult = ({displayResult}: DisplayResultProps): JSX.Element => {

    return (
        <div>
            {displayResult}
        </div>
    );
};

export default DisplayResult;
