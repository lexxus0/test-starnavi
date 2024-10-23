import { ReactNode, Suspense } from "react";
import Navigation from "./components/Navigation/Navigaton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
