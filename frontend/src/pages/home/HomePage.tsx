import Topbar from '@/components/Topbar';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';
import { usePlayerStore } from '@/stores/usePlayerStore';

const HomePage = () => {
  const { 
    fetchFeaturedSongs,
    fetchPersonalizedSongs,
    fetchTrendingSongs,
    isLoading,
    personalizedSongs,
    featuredSongs,
    trendingSongs,
   } = useMusicStore();
  const { user } = useUser();
  
  const { initializeQueue } = usePlayerStore();

   useEffect(() => {
    fetchFeaturedSongs();
    fetchPersonalizedSongs();
    fetchTrendingSongs();
   }, [fetchFeaturedSongs, fetchPersonalizedSongs, fetchTrendingSongs]);

   useEffect(() => {
    if (personalizedSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...personalizedSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
   }, [initializeQueue, personalizedSongs, featuredSongs, trendingSongs]);

  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
            Good Morning {user?.fullName?.split(" ")[0]}
          </h1>
          <FeaturedSection />

          <div className='space-y-8'>
            <SectionGrid title="Made For You" songs={personalizedSongs} isLoading={isLoading} />
            <SectionGrid title="Trending Songs" songs={trendingSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;