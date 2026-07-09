import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center py-20">
      <CheckSquare className="mx-auto h-24 w-24 text-blue-600" />
      <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        TaskMaster
      </h1>
      <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">
        Manage your tasks, tags, and subtasks efficiently with our modern tool.
      </p>
      <div className="mt-10">
        <Link
          to="/register"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="ml-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-gray-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;