import React, { useEffect, useState, useContext } from 'react';

const DialogContext = React.createContext<DialogContextProps | null>(null);
const { Provider, Consumer: DialogConsumer } = DialogContext;

interface DialogState {
  [key: string]: {
    opened: boolean,
    onConfirm: Function | null,
    onClose: Function | null,
  };
}

const DialogProvider: React.FunctionComponent = props => {
  const [state, setState] = useState<DialogState>({});

  const openDialog = (key: string, onConfirm: Function | null = null, onClose: Function | null = null) => {
    setState({ ...state, [key]: { opened: true, onConfirm, onClose } });
  }

  const closeDialog = (key: string) => {
    setState({ ...state, [key]: { opened: false, onConfirm: null, onClose: null } });

    return !!state[key].onClose ? state[key].onClose : null;
  }

  const confirmDialog = (key: string) => {
    setState({ ...state, [key]: { opened: false, onConfirm: null, onClose: null } });

    return !!state[key].onConfirm ? state[key].onConfirm : null;
  }

  const isOpened = (key: string) => {
    if (state[key] === undefined) {
      return false;
    }

    return !!state[key].opened;
  }

  return (
    <Provider value={{ isOpened, openDialog, closeDialog, confirmDialog }}>
      {props.children}
    </Provider>
  );
}

export default DialogContext;
export interface DialogContextProps {
  isOpened: (key: string) => boolean;
  openDialog: (key: string, onConfirm?: Function | null, onClose?: Function | null) => void;
  closeDialog: (key: string) => Function | null;
  confirmDialog: (key: string) => Function | null;
};
export { DialogProvider, DialogConsumer };
export function useDialog() {
  const state = useContext(DialogContext);

  if (!!!state) throw new Error('DialogContext is Null'); // 유효하지 않을땐 에러를 발생

  return state;
}
