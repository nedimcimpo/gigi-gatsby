import React from 'react';
import Countdown from '../../components/countdown';

const Count = props => (
  <div className="count relative">
    <div className="count__inner py-4 px-4 my-3 flex flex-ycenter flex-xcenter flex-wrap">
      <Countdown
        date={new Date(props.data.dateUntilSubmissionOpen).toString()}
      />
    </div>
  </div>
);

Count.handleFinish = () => {};
export default Count;
