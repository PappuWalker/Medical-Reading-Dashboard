import { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Medical Readings Dashboard</h1>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Medical Monitoring System</p>
      </footer>
    </div>
  );
};

export default Layout;