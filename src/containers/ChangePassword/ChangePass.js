import React, { useState } from 'react';
// import BaseButton from '../../components/Button';
// import BaseInput from '../../components/Input/Input';
// import { changePass, changePassGua } from '../../utils/auth';
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from 'react-router-dom';


export const ChangePass = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { role } = userData;
  const { userId } = userData;
  const data = {
    userId: userId,
    currentPasswd: pass,
    newPasswd: newPass,
    confirmNewpasswd: confirmPass,
  }; 
  console.log('data', data);

  const handleClick = async () => {
      if (!pass || !newPass || !confirmPass) {
        setError('Please fill in all fields.');
      } else if (newPass !== confirmPass) {
        setError("Passwords don't match");
      } else if (pass === newPass) {
        setError('New password should be different from the old password.');
      } else {
        setError('');
        if (role === 2) {
          try {
            const data = {
              userId: userId,
              currentPasswd: pass,
              newPasswd: newPass,
              confirmNewpasswd: confirmPass,
            };
            await changePass({data});
            alert('Password changed successfully');
            localStorage.removeItem('userData');
            navigate('/login');
          } catch (error) {
            setError('Please check your old password');
          }
        }

        if (role === 3) {
          try {
            const data = {
              userId: userId,
              currentPasswd: pass,
              newPasswd: newPass,
              confirmNewpasswd: confirmPass,
            };
            await changePassGua({ data });
            alert('Password changed successfully');
            localStorage.removeItem('userData');
            navigate('/login');
          } catch (error) {
            setError('Please check your old password')
          }
        }
    }
    
    } 

  return (
    <div className='flex flex-wrap h-screen'>
      <div className='flex justify-center items-center flex-col w-full'>
        <div className='text-black text-3xl font-semibold leading-10'>Change Your Password</div>
        <BaseInput classExtend='mt-4 w-96' label='Password' type='password' onChange={(e) => setPass(e.target.value)} />
        <BaseInput
          classExtend='mt-4 w-96'
          label='New Password'
          type='password'
          onChange={(e) => setNewPass(e.target.value)}
        />
        <BaseInput
          classExtend='mt-4 w-96'
          label='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <BaseButton className='bg-[#3A57E8] w-48 h-11 mt-6 rounded' content='Change Pass' onClick={handleClick} />
        {error && <div className='text-red-500 mt-2'>{error}</div>}
      </div>
      <SweetAlert2 didClose={() => setError({ ...error, show: false })} {...error} />
    </div>
  );
};
