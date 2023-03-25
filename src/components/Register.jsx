import { useForm } from "react-hook-form";
import { useContext } from "react";
import server from "../../utils/server";
import { userContext } from "../userContext";

import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user, setUser, id, setId } = useContext(userContext);

  const onSubmit = (data) => {
    server
      .post("http://localhost:3000/register", data)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.username);
        setId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=' h-screen bg-blue-200 flex justify-center items-center flex-col'>
      <form
        className=' p-9 rounded flex flex-col gap-5  border-2 border-solid border-slate-400'
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className=' text-center font-semibold text-3xl text-blue-700'>
          Register
        </h2>
        <div className='form-control'>
          <input
            className='input'
            {...register("username", { required: true })}
            placeholder='Username'
          />
          {errors.username && (
            <span className=' block text-purple-800'>
              This field is required
            </span>
          )}
        </div>
        <div className='form-control'>
          <input
            className='input'
            type='email'
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder='email'
          />
          {errors.email && (
            <span className=' block text-purple-800'>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='form-control'>
          <input
            className='input'
            type='password'
            {...register("password", { required: true })}
            placeholder='Password'
          />
          {errors.password && (
            <span className=' block text-purple-800'>
              This field is required
            </span>
          )}
        </div>

        <button
          className='input bg-blue-600 text-white hover:bg-blue-700 '
          type='submit'>
          Register
        </button>
      </form>
      <p className='text-lg mt-3'>
        Already a user?{" "}
        <Link to='/login' className=' text-green-600 underline cursor-pointer'>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
