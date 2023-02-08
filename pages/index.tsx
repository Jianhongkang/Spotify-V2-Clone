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

     {session ? (
        <>
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
       </>
      ) : (
        <Login providers={providers} />
      )}


    </div>
  )
}
export default Home

export async function getServerSideProps(){
  const session = await getSession();
  const providers = await getProviders();

  return {
    props: {
      session,
      providers,

    },
  };
}




