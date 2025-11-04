import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <div className="max-w-md mx-auto">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
              <ApperIcon name="MapPin" className="w-12 h-12 text-primary-500" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The page might have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <ApperIcon name="Home" className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="secondary" asChild>
              <Link to="/hotels">
                <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                Browse Hotels
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? <Link to="/about" className="text-primary-500 hover:text-primary-600">Contact our support team</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;