import React, { useState, useCallback } from 'react';
import { Card, Collapse } from 'reactstrap';
import styles from './styles.module.scss';
import activityMockData from './activityMockData';
import { SendIcon, ReceiveIcon, CopyIcon } from 'src/view/components/svgIcons';
import { Link } from 'react-router-dom';
import { any } from 'prop-types';
import { copyToClipboard } from '~/utility/clipboard';
import { mockComponent } from 'react-dom/test-utils';
import Web3 from 'web3';
import moment from 'moment';

const SubView = (props: any) => {
  console.log(props, '****asdasd');
  const { value, to, fee, newDate } = props;
  // const { hash = false, title, value } = props;
  const onClick = useCallback(event => copyToClipboard(event, value), [value]);

  return (
    <>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Recipient</p>
        <p className={styles.subViewValue}>
          <Link to="/">{to}</Link>
          <button onClick={onClick}>
            <CopyIcon />
          </button>
        </p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Transaction number</p>
        <p className={styles.subViewValue}>
          <Link to="/">{value}</Link>
          <button onClick={onClick}>
            <CopyIcon />
          </button>
        </p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Date</p>
        <p className={styles.subViewValue}>{newDate}</p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Fee</p>
        <p className={styles.subViewValue}>
          {fee && parseFloat(Web3.utils.fromWei(fee.toString())).toFixed(5)}
        </p>
      </div>
    </>
  );
};
const Activities = (props: any) => {
  console.log('****ksdjasdsd', props.data);
  const newTime = new Date(props.data.timestamp);
  console.log('****newTime', moment(newTime).format('MMM DD hh:mm a'));
  const { time, ftm, subView = [] } = props;
  const [isOpen, setIsOpen] = useState(false);
  const newDate = moment(newTime).format('MMM DD, hh:mm a');
  const isRecieve = props.data.from === props.address.toLowerCase();
  return (
    <div className={styles.activities}>
      <div className={styles.activitiesRow} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.status}>
          {isRecieve ? <SendIcon /> : <ReceiveIcon />}
          {isRecieve ? 'Sent' : 'Recieve'}
        </p>
        <div
          className={`d-flex justify-content-between w-100 ${styles.timeFtmWrapper}`}
        >
          <p className={styles.time}>{newDate}</p>
          <p className={styles.ftm}>
            {' '}
            {isRecieve ? '-' : '+'}
            {props.data.value &&
              parseFloat(Web3.utils.fromWei(props.data.value)).toFixed(5)}{' '}
            FTM
          </p>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <SubView
          to={props.data.to}
          fee={props.data.fee}
          newDate={newDate}
          value={props.data.hash}
        />
      </Collapse>
    </div>
  );
};
export default props => {
  console.log('*******props', props);
  return (
    <Card>
      <p className="card-label">Activity</p>
      <div>
        {/* {activityMockData.map((data: object, index: number) => (
        <Activities key={index} {...data} />
      ))} */}
        {props &&
          props.transactions &&
          props.transactions.list &&
          props.transactions.list.length > 0 &&
          props.transactions.list.map((data: object, index: number) => (
            <Activities key={index} data={data} address={props.address} />
          ))}
      </div>
    </Card>
  );
};