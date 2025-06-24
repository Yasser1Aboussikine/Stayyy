import React from "react";
import { SignUp } from "@clerk/clerk-react";

const CustomSignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#eaf6fd] via-white to-[#f4faff]">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <SignUp
          signUpFields={[
            {
              name: "role",
              label: "Select your role",
              type: "select",
              options: [
                { value: "user", label: "User" },
                { value: "hotelOwner", label: "Hotel Owner" },
                { value: "admin", label: "Admin" },
              ],
              required: true,
            },
          ]}
          appearance={{
            elements: {
              formField: "mb-4",
              formButtonPrimary:
                "bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition-all w-full",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CustomSignUp;
