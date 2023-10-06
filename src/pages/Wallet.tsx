import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

function Wallet() {
  return (
    <div
      className="h-screen w-full overflow-auto flex flex-col items-center bg-main
      bg-scroll bg-cover"
    >
      <div className="bg-white w-4/5 rounded-b-xl shadow-xl drop-shadow-xl z-10">
        <Header />
        <WalletForm />
      </div>
      <Table />
    </div>
  );
}

export default Wallet;
