import { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Chatbot from '../../components/Chatbot';

const Home = () => {
    const [category, setCategory] = useState("All");
    return (
        <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4">
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} />
                <AppDownload />
            </div>
        </div>
    )
}

export default Home
