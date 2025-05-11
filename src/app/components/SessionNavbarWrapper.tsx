import Navbar from "./Navbar";

const SessionNavbarWrapper = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return <Navbar isLoggedIn={isLoggedIn} />;
};

export default SessionNavbarWrapper;
