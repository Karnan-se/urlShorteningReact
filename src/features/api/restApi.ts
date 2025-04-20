import { userApi } from "./axios";

export const userLogin = async (email: string, password: string) => {
    try {
        const response = await userApi.post("/login", { email, password });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const userRegister = async ( name: string, email: string, password: string ) => {
    try {
        const response = await userApi.post("/register", { name, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Logout = async()=>{
    try {
        const response = await userApi.get("/logout")
        return response.data;
        
    } catch (error) {
        throw error
        
    }
}

export const submitUrl = async(origUrl :string)=>{
    try {
        const response = await userApi.post("/url" , {origUrl})
        return response.data
        
    } catch (error) {
        throw error
        
    }
}


export const getStats = async()=>{
    try {
        const response  = await userApi.get("/stats")
        return response.data
        
    } catch (error) {
        throw error
        
    }
}
