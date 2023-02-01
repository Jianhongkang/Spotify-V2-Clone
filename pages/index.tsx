import type { NextPage } from 'next';
import {getSession} from "next-auth/react";
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import Player from '../components/Player';



const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">

      <main className='flex'>
        {/* Sidebar */}
       <Sidebar />
       <Center/>

       
      </main>
      
      <div className='sticky bottom-0'>
        <Player />
      </div>



    </div>
  )
}
export default Home

export async function getServerSideProps(){
  const session = await getSession();

  return {
    props: {
      session,
    },
  };
}




