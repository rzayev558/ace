import Image from 'next/image';
import advantages from '../../../public/advantages.jpeg';

function page() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Image
        src={advantages}
        alt="Full Page Image"
      />
    </div>
  );
}

export default page;