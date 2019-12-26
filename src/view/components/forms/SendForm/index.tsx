import React, { FC, useState, useCallback, useEffect } from 'react';
import { Button, Modal, ModalBody, Card } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import DashboardInput from '../DashboardInput';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { IModalChildProps } from '~/redux/modal/constants';
import { copyToClipboard } from '~/utility/clipboard';

import Input from '../Input';
import {
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';

const mapStateToProps = state => ({
  account: selectAccount(state),
});
const mapDispatchToProps = {
  accountSendFunds: ACCOUNT_ACTIONS.accountSendFunds,
  accountTransferClear: ACCOUNT_ACTIONS.accountTransferClear,
  accountSetTransferErrors: ACCOUNT_ACTIONS.accountSetTransferErrors,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
  accountGetTransferFee: ACCOUNT_ACTIONS.accountGetTransferFee,
  accountSetTransfer: ACCOUNT_ACTIONS.accountSetTransfer,
};

type IProps = IModalChildProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    data: {
      publicAddress: string;
      balance: number;
    };
  };

const TransferFunds: FC<IProps> = ({
  account: {
    list,
    transfer: { errors, is_sent, is_processing, fee },
  },
  data,
  onClose,
  accountSendFunds,
  accountTransferClear,
  accountSetTransferErrors,
  accountGetBalance,
  accountGetTransferFee,
  accountSetTransfer,
}) => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [sendingErrors, setErrors] = useState({ amount: false, to: false });
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');

  const handleClearAll = useCallback(() => {
    setTo('');
    setAmount('');
    setMemo('');
    setErrors({ amount: false, to: false });
  }, [setTo, setAmount, setMemo]);

  const handlePassword = useCallback(() => {
    const validation_errors = {
      amount: amount === '' || (amount || 0) > data.balance,
      to: to.length !== 42,
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);
    setModal(true);
  }, [data, to, amount]);

  const sendSuccess = useCallback(() => {
    setIsSending(true);
    setModal(false);
  }, [setIsSending, setModal]);

  // useEffect(()=>{},[isSending])

  const handleSubmit = useCallback(() => {
    const validation_errors = {
      ...sendingErrors,
      password: password === '',
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);

    setTimeout(() => {
      accountSendFunds({
        to,
        from: data.publicAddress,
        amount,
        message: memo,
        password,
      });
    }, 2000);
    setIsSending(true);
  }, [
    sendingErrors,
    password,
    accountSendFunds,
    to,
    data.publicAddress,
    amount,
    memo,
  ]);

  const onClick = useCallback(
    event => copyToClipboard(event, data.publicAddress),
    [data.publicAddress]
  );

  return (
    <>
      {isSending ? (
        <div>
          <Card className={classnames(styles.transCard, 'mb-5 mt-5')}>
            <h2>Transaction sent!</h2>
            <div className={classnames(styles.iconGap, styles.hash)}>
              <a href="#">{data.publicAddress}</a>
              <button
                className={styles.copyBtn}
                type="button"
                onClick={onClick}
              >
                <CopyIcon />
              </button>
            </div>
            <div>
              <CheckCircleIcon />
            </div>
          </Card>
        </div>
      ) : (
        <>
          <Modal
            isOpen={modal}
            className={classnames(
              'modal-dialog-centered',
              styles.passwordModal
            )}
          >
            <ModalBody className={styles.body}>
              <Input
                type="password"
                label="Please enter your wallet password to send the transaction"
                value={password}
                placeholder="Enter password"
                handler={value => {
                  setPassword(value);
                }}
                // errorClass="justify-content-center"
                isError={false}
                errorMsg=""
              />
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={classnames('btn btn-secondary', styles.sendBtn)}
                >
                  Send
                </button>
              </div>
            </ModalBody>
          </Modal>

          <div className={classnames('card', styles.card)}>
            <h2 className={styles.title}>Send FTM</h2>
            <div className={styles.inputsWrapper}>
              <DashboardInput
                label="Amount"
                placeholder="Enter amount"
                rightLabel="Entire balance"
                value={amount}
                type="number"
                handleChange={val => {
                  setAmount(val);
                  setErrors({ ...sendingErrors, amount: false });
                }}
                error={{
                  isError: sendingErrors.amount,
                  errorText:
                    'This amount exceeds your balance. Please enter a lower amount',
                }}
              />
              <DashboardInput
                label="To address"
                value={to}
                type="text"
                handleChange={val => {
                  setTo(val);
                  setErrors({ ...sendingErrors, to: false });
                }}
                error={{
                  isError: sendingErrors.to,
                  errorText: 'Enter a valid FTM address',
                }}
                placeholder="Enter address"
              />
              <DashboardInput
                label="Memo (optional)"
                value={memo}
                type="text"
                placeholder="Enter memo"
                handleChange={setMemo}
              />
            </div>
            <div className={styles.btnWrapper}>
              <Button
                className={classnames(styles.btn, styles.send)}
                onClick={handlePassword}
              >
                Send
              </Button>
              <Button
                color="topaz"
                className={classnames(
                  styles.btn,
                  styles.clear,
                  'border-0 outlined'
                )}
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Transfer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferFunds);

export default Transfer;