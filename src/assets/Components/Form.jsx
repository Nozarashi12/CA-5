import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const password = watch('password', '');

  const onSubmit = data => {
    console.log(data);
    setIsSubmitted(true);

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="mainform">
      <nav className='nav2 flex justify-between bg-gray-50 h-100 p-6'>
        <Link to={'/'}>
          <img className='h-9 hover:opacity-70' src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="logo" />
        </Link>
        <Link to={'/'}>
          <button className="border border-white bg-red-500 p-2 px-6 rounded text-white font-bold hover:bg-gray-500 transition duration-300">Home</button>
        </Link>
      </nav>
      <center className="formm">
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          {isSubmitted && !Object.keys(errors).length && (
            <div className="pop p-3 rounded mb-5"><p className="registered-heading">Account created successfully</p></div>
          )}
          <h1 className="heading text-xl font-bold">Create Account</h1>
           <br/>
           <label htmlFor="firstname"></label>
<input
  className="inputs"
  {...register('firstname', {
    required: 'This Field is required',
    minLength: { value: 3, message: 'Minimum 3 characters are required' },
    maxLength: { value: 30, message: 'Maximum length is 30 characters' }
  })}
  placeholder="Enter your Full Name"
  id="firstname"
/>
{errors.firstname && <span className="errormsg">{errors.firstname.message}</span>}
<br />

<label htmlFor="email"></label>
<input
  className="inputs "
  {...register('email', {
    required: 'This Field is required',
    pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' },
    minLength: { value: 4, message: 'Minimum 4 characters are required' },
    maxLength: { value: 30, message: 'Maximum length is 20 characters' }
  })}
  placeholder="Enter your Email address"
  id="email"
/>
{errors.email && <span className="errormsg">{errors.email.message}</span>}
<br />

<label htmlFor="password"></label>
<input
  className="inputs"
  {...register('password', {
    required: 'This Field is required',
    minLength: { value: 10, message: 'Minimum 10 characters are required' },
    maxLength: { value: 20, message: 'Maximum length is 20 characters' },
    pattern: {
      value: /^(?=.*[!@#$%^&*])/,
      message: 'Password must contain at least one special character',
    }
  })}
  placeholder="Enter your New Password"
  type="password"
  id="password"
/>
{errors.password && <span className="errormsg">{errors.password.message}</span>}
<br />

<label htmlFor="repeat-password"></label>
<input
  className="inputs"
  {...register('repeatPassword', {
    required: 'This Field is required',
    validate: value => value === password || 'Your Passwords do not match',
  })}
  placeholder="Re-enter the Password"
  type="password"
  id="repeat-password"
/>
{errors.repeatPassword && <span className="errormsg">{errors.repeatPassword.message}</span>}
<br />

{errors.terms && <span className="errormsg">{errors.terms.message}</span>}
<br />

<button type="submit" className="text-white sub-btn  bg-red-500 rounded p-2">Submit</button>
        </form>
      </center>
    </div>
  );
}

export default Form;
