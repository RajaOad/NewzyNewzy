import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
    <Sidebar />
    <main className="flex-grow">{children}</main>
  </div>
  );
};

export default Layout;
