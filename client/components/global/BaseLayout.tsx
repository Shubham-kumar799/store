//components
import { Navbar } from './navbar';
import Footer from './Footer';

//types
import { FC } from 'react';

interface Props {
  nostyles?: boolean;
}

const BaseLayout: FC<Props> = ({ children, nostyles = false }) => {
  return (
    <>
      <Navbar />
      {nostyles ? (
        <div>{children}</div>
      ) : (
        <div
          style={{
            paddingTop: '16px',
            overflow: 'hidden',
            minHeight: '100vh',
          }}
          className="py-16  overflow-hidden min-h-screen"
        >
          <div
            style={
              {
                // paddingLeft: '4px',
              }
            }
            className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8"
          >
            {children}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BaseLayout;
