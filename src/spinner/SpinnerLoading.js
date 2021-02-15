import SpinnerLoad from './SpinnerLoad.gif';

const SpinnerLoading = () => {
  return (
    <div
      // className='mr-auto'
      className='spinner'
      style={{
        display: 'flex',
        height: '100%',
        opacity: 0.7,
        position: 'absolute',
        // top: '1%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        // className='mr-auto'
        src={SpinnerLoad}
        alt='..loading'
        style={{ widows: '200px', display: 'block' }}
      />
    </div>
  );
};

export default SpinnerLoading;
