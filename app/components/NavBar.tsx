import React from "react";
import Image from "next/image";

function NavBar() {
  return (
    <div className="bg-white px-6 py-6 border-b border-gray-100">
      <div className="flex flex-row items-center justify-between">
        <div>
          <Image src="/logo1.png" alt="logo" width={150} height={150} />
        </div>
        <div>
          <h1 className="text-slate-800 text-3xl font-extrabold tracking-wide mb-2">
            Foot step Generation
          </h1>
          <p className="text-lg text-slate-600 text-center">Monitoring System</p>
        </div>
        <div>
          <Image src="/logo2.png" alt="logo" width={150} height={150} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
