import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../features/validationSchema/loginValidation";
import { userLogin } from "../features/api/restApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../features/stores/store";
import { useEffect } from "react";
import { setUserCredentials } from "../features/slices/authSlice";
import { Link } from "react-router-dom";



interface LoginFormValues {
  email: string;
  password: string;
}


export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }

  }, [userInfo])


  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    console.log("Form Values:", values);
    const email = values.email;
    const password = values.password
    try {
      const response = await userLogin(email, password)
      //  console.log(response.user , "response")
      dispatch(setUserCredentials(response.user))
      toast.message(response.message)

    } catch (error) {
      console.log(error)

    }


  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>


        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Field
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-amber-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-amber-500"
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>

      </div>
    </div>
  );
}
