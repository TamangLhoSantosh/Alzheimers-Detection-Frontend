import { useState } from "react";

const createAccount = () => {
  // State to store the form values
  const [values, setValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(values);
    console.log("Account Created");
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            <form onSubmit={handleSubmit} className="my-auto">
              <p className="text-3xl font-bold">Sign Up</p>
              <br />
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <p className="text-base my-2">First Name</p>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter your First Name"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Middle Name */}
                  <div>
                    <p className="text-base my-2">Middle Name</p>
                    <input
                      type="text"
                      name="middlename"
                      placeholder="Enter your Middle Name"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <p className="text-base my-2">Last Name</p>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter your Last Name"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* DOB */}
                  <div>
                    <p className="text-base my-2">DOB</p>
                    <input
                      type="date"
                      name="dob"
                      placeholder="Enter your Date of Birth"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Gender */}
                  <div>
                    <p className="text-base my-2">Gender</p>
                    <select
                      name="gender"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select your Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {/* Contact No */}
                  <div>
                    <p className="text-base my-2">Contact Number</p>
                    <input
                      type="text"
                      name="contact"
                      placeholder="Enter your Contact No"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Address */}
                  <div>
                    <p className="text-base my-2">Address</p>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your Address"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <p className="text-base my-2">Email</p>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <p className="text-base my-2">Password</p>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="border rounded-md p-1 w-full"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="border rounded-lg py-2 px-16 md:px-24 bg-black text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default createAccount;
