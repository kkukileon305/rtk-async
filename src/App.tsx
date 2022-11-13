import { useAppDispatch, useAppSelector } from './redux/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);

  return (
    <div className=''>
      <header className='bg-gray-500'>
        <div className='max-w-[1060px] w-full mx-auto py-12'>
          <h2 className='font-bold text-3xl'>Title</h2>
        </div>
      </header>
    </div>
  );
};
export default App;
