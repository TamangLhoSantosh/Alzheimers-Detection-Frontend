import { useState } from "react";

const loign = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    let error = "";

    // Email regex pattern for specific domain
    const emailPattern = /^[^\s@]+/;
    // Password regex pattern (at least 8 characters)
    const passwordPattern = /^.{8,}$/;

    if (name === "email" && !emailPattern.test(value)) {
      error = "Email must be in the format: example@patancollege.edu.np.";
    }

    if (name === "password" && !passwordPattern.test(value)) {
      error = "Password must be at least 8 characters long.";
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // Validation function
  const validation = () => {
    if (errors.email !== "" || errors.password !== "") {
      console.log(errors);
      return false;
    }

    if (values.email === "" || values.password === "") {
      console.log(values);
      return false;
    }
    return true;
  };

  // Function to handle login
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validation()) return;
    console.log("loign");
  };

  return (
    <div>
      <div className="flex justify-center h-[510px]">
        <div className="w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <form onSubmit={handleLogin} className="my-8">
              <p className="text-4xl font-bold">Login</p>
              <br />
              {/* Email and Password Fields */}
              <div className="w-11/12">
                {/* email */}
                <p className="text-base my-3">Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  className="border rounded-md p-1 w-full"
                  onChange={handleChange}
                  required
                />
                {/* password */}
                <p className="text-base my-3">Password</p>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Enter your password"
                  className="border rounded-md p-1 w-full"
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              {/* Login Button */}
              <button
                type="submit"
                className="my-4 md:mx-4 border rounded-lg py-2 px-16 md:px-24 bg-black text-white"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loign;
