import { UserProvider } from "./Auth";

const AppProvider = ({ children }) => (
  <>
    <UserProvider>{children}</UserProvider>
  </>
);

export default AppProvider;
