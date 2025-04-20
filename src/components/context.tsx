import { createContext, ReactNode, useContext, useState } from "react";
import { getStats } from "../features/api/restApi";
import { useEffect } from "react";




interface StatsContextType {
    stats: StatsData | null;
    refetchStats: () => void;
}
interface StatsData {
    totalUrls: number;
    totalUsers: number;

}
const StatsContext = createContext<StatsContextType | undefined>(undefined);

export default function StatsProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<StatsData | null>(null);


    const fetchStats = async () => {
        try {
            const response = await getStats()
            console.log(response, "response here")
            setStats(response)


        } catch (error) {
            console.log(error)
            throw error

        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    return ( 
    <StatsContext.Provider value={{ stats, refetchStats: fetchStats }}>
        {children}
    </StatsContext.Provider>
    )
}

export const useStats = () => {
    const context = useContext(StatsContext);
    if (!context) {
      throw new Error("useStats must be used within a StatsProvider");
    }
    return context;
  };
  