import React from "react";
import Button from "../Components/Shared/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()

  const signupHandler = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/user/signup", { name, email, password }, {withCredentials: true})
      if(data.success) {
        const { user, token } = data
        login(user, token)
        toast.success(data.message)
        navigateTo('/')
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white px-6 py-8 border-2 shadow-lg rounded-lg">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              login to your account
            </a>
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600 pt-4">
          Already logged in?{" "}
          <Link
            className="font-medium text-gray-600 hover:text-indigo-500" to={'/signin'}
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
