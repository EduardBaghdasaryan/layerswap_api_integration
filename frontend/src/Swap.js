import { useGetSwap } from "./hooks";

export default function Swap() {
  const { swap } = useGetSwap();

  return (
    <>
      <p>This is a test HTML for the Swap component.</p>
    </>
  );
}
