import MonoConnect from "@mono.co/connect.js";

function ConnectBankButton() {
  const monoConnect = new MonoConnect({
    key: import.meta.env.VITE_MONO_PUBLIC_KEY,
    onSuccess: (data) => {
      console.log("Auth code generated:", data.code);
    },
    onClose: () => console.log("Widget closed"),
  });

  return <button onClick={() => monoConnect.open()}>Link Bank Account</button>;
}

export default ConnectBankButton;
