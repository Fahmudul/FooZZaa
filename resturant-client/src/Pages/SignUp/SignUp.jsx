import React, { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaLock, FaUser } from "react-icons/fa";
import { MdEmail, MdInsertPhoto } from "react-icons/md";
import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthProvider/AuthProvider";

import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, updateUserInformation } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateUserInformation(name)
          .then((res) => {
            console.log("user updated");
            const userInfo = {
              name: data.name,
              email: data.email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                alert("user added to the data base");
                window.location.href = "/";
              }
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  // const provider = new GoogleAuthProvider();
  // const gitHubProvider = new GithubAuthProvider();
  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const email = data.get("email");
  //   const password = data.get("password");
  //   const photo = data.get("photo");
  //   const name = data.get("name");
  //   setError("");
  //   setPhotoUrl(photo);
  //   if (password.length < 6) {
  //     alert("Password need to be at-least 6 characters");
  //     return;
  //   }
  //   if (!/[A-Z]/.test(password)) {
  //     alert("Password must need to contain an Uppercase letter ");
  //     return;
  //   }
  //   if (!/^(?=.*[a-z]).+$/.test(password)) {
  //     alert("Password must need to contain an LowerCase letter ");
  //     return;
  //   }
  //   createUser(email, password).then((result) => {
  //     const userData = { email, name };

  //     updateProfile(result.user, {
  //       photoURL: photo,
  //       displayName: name,
  //     });
  //   });
  // };
  // const handleGoogleSignIn = () => {
  //   console.log(GoogleSignIn);

  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       console.log(result.user);
  //       const photoUrl = result.user?.photoURL;
  //       setPhotoUrl(photoUrl);
  //       toast.success("Successfully created your account");
  //       setTimeout(function () {
  //         location.reload();
  //         window.location.href = "/";
  //       }, 2000);
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };
  // const handleGitHubSignIn = () => {
  //   signInWithPopup(auth, gitHubProvider)
  //     .then((result) => {
  //       console.log(result.user);
  //       const photoUrl = result.user?.photoURL;
  //       setPhotoUrl(photoUrl);
  //       toast.success("Successfully created your account");
  //       // setTimeout(function () {
  //       //   // console.log("redirect");
  //       //   location.reload();
  //       //   window.location.href = "/";
  //       // }, 2000);
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  const handleShowPassword = () => {
    setShow(!show);
  };
  return (
    <div className="hero min-h-screen bg-custom-background">
      <Helmet>
        <meta charSet="utf-8" />
        <title>PaletteParadise | Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div
        className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#979696] "
        style={{ height: "670px", display: "block" }}
      >
        <h1 className=" text-center text-xl font-bold mt-4 text-white">
          Create your Account!
        </h1>

        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control relative">
            <FaUser className="w-5 h-5 absolute  top-2 " />

            <label className="label ml-5">
              <span className="label-text text-base font-bold">Name</span>
            </label>
            <input
              type="name"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control relative">
            <MdInsertPhoto className="w-5 h-5 absolute top-2" />

            <label className="label ml-5">
              <span className="label-text text-base font-bold">Photo Url</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photo URL"
              className="input input-bordered"
              required
              {...register("photo")}
            />
          </div>
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
              {...register("email")}
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
              {...register("password")}
            />
            <span onClick={handleShowPassword}>
              {show ? (
                <FaEyeSlash className="absolute right-[17px] w-6 h-6 top-[52px]" />
              ) : (
                <FaEye className="absolute right-[17px] w-6 h-6 top-[52px]" />
              )}
            </span>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-gray-800 border-none text-white">
              Sign Up
            </button>
          </div>

          <p className="mt-3 mb-3 text-center ">
            Already Have an account{" "}
            <Link className="underline  text-blue-800" to="/signin">
              Sign In
            </Link>
          </p>

          <div className="flex gap-2 mx-auto mb-5">
            <div>
              <button
                className="btn w-[140px] px-0"
                onClick={() => {
                  handleGoogleSignIn();
                }}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>{" "}
                Google Login
              </button>
            </div>
            <div>
              <button
                className="btn w-[140px] px-0"
                onClick={() => {
                  handleGitHubSignIn();
                }}
              >
                <FaGithub className="w-5 h-5" />
                Github Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
