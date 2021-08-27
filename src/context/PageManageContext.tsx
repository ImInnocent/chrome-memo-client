import React, {useState} from 'react';

const PageManageContext = React.createContext<PageManageContextProps>({});
const { Provider, Consumer: PageManageConsumer } = PageManageContext;

const PageManageProvider: React.FunctionComponent = props => {
  const [page, setPage] = useState<string>('memo');

  return (
    <Provider value={{ page, setPage }}>
      {props.children}
    </Provider>
  );
}

export default PageManageContext;
export interface PageManageContextProps {
  page?: string;
  setPage?: React.Dispatch<React.SetStateAction<string>>;
};
export { PageManageProvider, PageManageConsumer };
