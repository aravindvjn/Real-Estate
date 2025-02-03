import React from 'react';

const Page = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">About This Project</h1>
        <p className="mt-4 text-[16px] md:text-xl text-gray-600">
          This is a project production, and all the properties displayed here are fictional. They are not for real transactions or any other purposes.
        </p>

        <div className="mt-8 space-y-6 text-left">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900">Project Overview</h2>
          <p className="text-[14px] md:text-[18px] text-gray-600">
            This platform is created as part of a project for educational or demonstrative purposes. The properties and content on this website are entirely fictional and intended solely for the purpose of showcasing web development techniques.
          </p>

          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mt-6">Disclaimer</h2>
          <p className="text-[14px] md:text-[18px] text-gray-600">
            Please note that the properties shown here are not available for sale or rent. They are part of the demo environment, and no actual transactions can take place through this platform.
          </p>

          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mt-6">Contact</h2>
          <p className="text-[14px] md:text-[18px] text-gray-600">
            If you have any questions or feedback about the project, feel free to contact us at <a href="mailto:support@realestate.com" className="text-blue-600">aravind284479@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
