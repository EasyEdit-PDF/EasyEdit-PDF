import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { currentUser } from '@clerk/nextjs';


export default async function Dashboard() {

    return (
        <main className="sm:p-7 sm:pb-0">
            <Header />
            <Hero />
            <Features />
            <Footer />
        </main>
    );
}
