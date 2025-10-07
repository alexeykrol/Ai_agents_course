
import FullLogo from "src/layouts/full/shared/logo/FullLogo";
import AuthRegister from "../authforms/AuthRegister";
import { Link } from "react-router";


const Register = () => {
  return (
    <div  className="relative overflow-hidden h-screen">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative break-words md:w-[420px] w-full border-none">
          <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
            <div className="mx-auto">
              <FullLogo />
            </div>
            <p className="text-sm text-center text-dark my-3">
              Sign Up on Spike
            </p>
            <AuthRegister />
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
              <p>Already have an Account?</p>
              <Link to="/auth/login" className="text-primary text-sm font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
