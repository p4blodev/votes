import { SocketProvider } from "./context/SocketContex";
import HomePage from "./pages/HomePage";

export const App = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};
