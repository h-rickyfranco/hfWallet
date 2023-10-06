import logo from '../images/icon.svg';

function Logo() {
  return (
    <div className="flex justify-center items-center my-6 gap-4">
      <div className="bg-sky-400 rounded-2xl relative">
        <img src={ logo } alt="application logo" className="scale-110" />
      </div>
      <h1 className="text-5xl font-light">
        HF
        {' '}
        <span className="text-blue-600 font-bold">Wallet</span>
      </h1>
    </div>
  );
}

export default Logo;
