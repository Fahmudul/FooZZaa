import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import "../../../src/Utility.css";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
// import toast from "react-hot-toast";
// import { Helmet } from "react-helmet";

const Login = () => {
  const [show, setShow] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  // console.log(from);
  // const [captchaString, setCaptchaString] = useState("");
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // validate captcha
  const handleSignIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));

    // console.log(email, password);
    // logIn(email, password)
    //   .then((result) => {
    //     console.log(result.user);
    //     toast.success("Logged in Successfully");
    //     setTimeout(function () {
    //       window.location.href = "/";
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     const errorMessages = error.message;
    //     const errorCode = errorMessages.split("(")[1].split(")")[0];
    //     const errorCodeWithoutAuth = errorCode.replace(/^auth\//, "");
    //     const formattedErrorCode = errorCodeWithoutAuth.replace(/-/g, " ");
    //     toast.error(formattedErrorCode);
    //   });
  };
  const handleShowPassword = () => {
    setShow(!show);
    console.log(show);
  };
  // const handleCaptchaValidation = (e) => {
  //   console.log(e.target.value);
  //   const captchaString = e.target.value;
  //   // console.log(captchaString)
  //   // if (validateCaptcha(captchaString) == true) {
  //   //   setDisableBtn(false);
  //   // } else {
  //   //   setDisableBtn(true);
  //   // }

  //   // if (validateCaptcha(captchaString)) {
  //   //   setDisableBtn(false);
  //   // } else {
  //   //   setDisableBtn(true);
  //   // }
  // };
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    console.log(validateCaptcha(user_captcha_value));
    if (validateCaptcha(user_captcha_value)) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };
  // console.log(disableBtn);
  return (
    <div className="hero min-h-screen ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BistroBoss | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="card shrink-0 w-full max-w-sm  bg-blur bg-[#fffdfd]">
        <h1 className="text-[#cccccc] text-center text-xl font-bold mt-4">
          Welcome Back!
        </h1>
        <form className="card-body " onSubmit={handleSignIn}>
          <div className="form-control relative">
            <MdEmail className="w-5 h-5 absolute  top-[9px]" />
            <label className="label">
              <span className="label-text text-base font-bold ml-5">Email</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <FaLock className="w-5 h-5 absolute  top-2 " />

            <label className="label ml-5">
              <span className="label-text text-base font-bold">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <span onClick={handleShowPassword}>
              {show ? (
                <FaEyeSlash className="absolute right-[17px] w-6 h-6 top-[52px]" />
              ) : (
                <FaEye className="absolute right-[17px] w-6 h-6 top-[52px]" />
              )}
            </span>
          </div>
          <div>
            <label htmlFor="">
              <LoadCanvasTemplate className="text-black" />
            </label>
            <input
              onBlur={handleValidateCaptcha}
              type="text"
              name="captcha"
              placeholder="type the captcha above"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-3">
            <button
              // disabled={disableBtn}
              className="btn bg-gray-800 outline-none border-none text-white"
            >
              Login
            </button>
          </div>

          <p className="mt-7 text-center text-white ">
            Dont Have an account?{" "}
            <Link className="underline  text-blue-800" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
