import { useIsMobile } from '../../utils/hooks';

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-white border-t-2 border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={isMobile ? 'text-center' : 'col-span-1 md:col-span-2'}>
            <h3 
              className={`font-bold mb-3 ${isMobile ? 'text-lg' : 'text-xl'}`}
              style={{ color: 'var(--color-primary)' }}
            >
              SpendMate
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your personal finance companion. Track income, manage expenses, and achieve your financial goals with ease.
            </p>
            <p className="text-xs text-gray-500">
              Built with MERN Stack - MongoDB, Express.js, React.js, Node.js
            </p>
          </div>

          {!isMobile && (
            <>
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-dark)' }}>
                  Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Income Tracking</li>
                  <li>Expense Management</li>
                  <li>Balance Overview</li>
                  <li>Visual Calendar</li>
                  <li>Category Analysis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text-dark)' }}>
                  Technologies
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>React.js + Vite</li>
                  <li>Tailwind CSS v4</li>
                  <li>Node.js + Express</li>
                  <li>MongoDB Atlas</li>
                  <li>JWT Authentication</li>
                </ul>
              </div>
            </>
          )}
        </div>

        <div className={`border-t border-gray-200 mt-8 pt-6 flex ${isMobile ? 'flex-col text-center' : 'flex-col sm:flex-row justify-between items-center'}`}>
          <p className="text-sm text-gray-500">
            &copy; 2025 SpendMate. All rights reserved.
          </p>
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-4'} mt-4 sm:mt-0`}>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;