import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { store } from './redux/store';
import { fetchUser, logout } from './redux/userSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);

  const [id, setId] = useState(1);
  const [isNegative, setIsNegative] = useState(false);

  const handleLogin = () => {
    if (id > 0) {
      setIsNegative(false);
      dispatch(fetchUser(id));
    } else {
      setIsNegative(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className='bg-gray-500'>
        <div className='max-w-[1060px] w-full mx-auto py-12'>
          <h2 className='font-bold text-3xl'>Title</h2>
        </div>
      </header>
      <div className='max-w-[1060px] w-full mx-auto flex flex-col items-center mt-12'>
        <p className='text-center mb-4'>
          로그인 버튼을 클릭하면 <br />
          user dummyjson을 가져옵니다. <br />
          아래 input에 해당하는 n번째 유저의 아이디를 가져옵니다.
        </p>
        <input className='border' defaultValue={1} placeholder='숫자를 입력해주세요' type='number' onChange={({ target: { value } }) => setId(Number(value))} />
        {isNegative && <p className='font-bold mt-4'>1 이상의 정수만 입력 가능</p>}
        <button onClick={handleLogin} className='w-full py-4 mt-4 bg-gray-600 text-white font-bold'>
          로그인
        </button>
        <button onClick={handleLogout} className='w-full py-4 mt-4 bg-gray-600 text-white font-bold'>
          로그아웃
        </button>
      </div>
      <div className='max-w-[1060px] w-full mx-auto flex items-center'>
        <div className='w-1/2 text-center'>
          <h2 className='font-bold text-3xl mt-12'>로그인 정보</h2>
          {user.loading === 'pending' ? <p>불러오는중...</p> : user.userInfo ? <p>First name: {user.userInfo.firstName}</p> : <p>유저 정보 없음</p>}
        </div>
        <div className='w-1/2 flex justify-center items-center'>
          <p>현재상태: {user.loading}</p>
        </div>
      </div>
    </>
  );
};
export default App;
