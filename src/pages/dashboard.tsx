import Header from "../components/Header"
import { useState } from "react"
import { ClipboardCopy } from "lucide-react"
import { submitUrl } from "../features/api/restApi"



export default function Dashboard() {

    const [shortUrl, setShortUrl] = useState("")
    const [origUrl, setOrigUrl] = useState("")
    const [isCopied, setIsCopied] = useState(false)

    const handleSubmit =  async()=>{
        const response = await submitUrl(origUrl)
        console.log(response.savedUrl)
        setShortUrl(response.savedUrl.shortUrl)

    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <Header />

                <main className="max-w-4xl mx-auto px-4 py-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">URL Shortener</h1>
                        <p className="text-gray-600">Shorten your long URLs into compact links</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Input Section */}
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter your long URL here..."
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                    onChange={(e) => setOrigUrl(e.target.value)}
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3
                                 rounded-lg transition-colors duration-200
                                  whitespace-nowrap" onClick={handleSubmit}>
                                    Shorten URL
                                </button>
                            </div>
                        </div>

                        {/* Result Section - Only shown when there's a result */}
                        {shortUrl ? (
                            <div className="bg-gray-50 border-t border-gray-100 p-6 md:p-8">
                                <h2 className="text-sm font-medium text-gray-500 mb-3">Your shortened URL</h2>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-blue-600 font-medium overflow-x-auto">
                                        {shortUrl}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap ${isCopied ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                            }`}
                                    >
                                        {isCopied ? (
                                            "Copied!"
                                        ) : (
                                            <>
                                                <ClipboardCopy className="w-4 h-4" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-blue-600 font-bold text-2xl">0</div>
                            <div className="text-gray-600 text-sm mt-1">URLs Shortened</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-blue-600 font-bold text-2xl">0</div>
                            <div className="text-gray-600 text-sm mt-1">Total Users</div>
                        </div>
                        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-blue-600 font-bold text-2xl">0</div>
                            <div className="text-gray-600 text-sm mt-1">Clicks</div>
                        </div> */}
                    </div>
                </main>
            </div>


        </>
    )
}