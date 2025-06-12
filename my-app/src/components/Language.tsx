import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CURRENCIES = [
  { name: 'Afghan Afghani', code: 'AFN' },
  { name: 'Albanian Lek', code: 'ALL' },
  { name: 'US Dollar', code: 'USD' },
  { name: 'Euro', code: 'EUR' },
  { name: 'British Pound', code: 'GBP' },
  { name: 'Indian Rupee', code: 'INR' },
  // ... add more currencies as needed
];

const LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Italian', code: 'it' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Dutch', code: 'nl' },
  { name: 'Russian', code: 'ru' },
  { name: 'Chinese (Simplified)', code: 'zh-CN' },
  { name: 'Chinese (Traditional)', code: 'zh-TW' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Korean', code: 'ko' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Bengali', code: 'bn' },
  { name: 'Turkish', code: 'tr' },
  { name: 'Polish', code: 'pl' },
  { name: 'Swedish', code: 'sv' },
  { name: 'Norwegian', code: 'no' },
  { name: 'Danish', code: 'da' },
];

// Define interfaces for type safety
interface Currency {
  name: string;
  code: string;
}

interface Language {
  name: string;
  code: string;
}

const CurrencyLanguageSelector: React.FC = () => {
  const { user } = useUser();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'currency' | 'language'>('currency');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle backend sync with proper error handling
//   const handleBackendSync = async (clerkUserId: string) => {
//     try {
//       const response = await fetch("http://localhost:5005/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkUserId }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log("User synced with backend:", result);
//     } catch (err) {
//       console.error("Backend sync error:", err);
//       setError("Failed to sync user data with backend");
//     }
//   };
const handleBackendSync = async (clerkUserId: string) => {
    try {
      // Step 1: Check if user already exists
      const checkResponse = await fetch(`http://localhost:5005/by-clerk-id?clerkUserId=${clerkUserId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!checkResponse.ok) {
        throw new Error(`HTTP error during check! status: ${checkResponse.status}`);
      }
  
      const existingUsers = await checkResponse.json();
  
      if (existingUsers) {
        console.log("User already exists:", existingUsers);
        return existingUsers[0]; // User already exists, do not post
      }
  
      // Step 2: If no user found, create a new one
      const createResponse = await fetch("http://localhost:5005/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId }),
      });
  
      if (!createResponse.ok) {
        throw new Error(`HTTP error during creation! status: ${createResponse.status}`);
      }
  
      const newUser = await createResponse.json();
      console.log("New user created:", newUser);
      return newUser;
    } catch (err) {
      console.error("Backend sync error:", err);
      setError("Failed to sync user data with backend");
    }
  };

  // Update user preferences in database
  const updateUserPreferences = async (currency: string, language: string) => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5005/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          currency: currency,
          language: language 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("User preferences updated:", result);
      
      // Success - you can navigate to next page or show success message
      alert(`Preferences saved successfully!\nCurrency: ${currency}\nLanguage: ${language}`);
      
    } catch (err) {
      console.error("Failed to update user preferences:", err);
      setError("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Sync user data when component mounts
  useEffect(() => {
    if (user?.id) {
      handleBackendSync(user.id);
    }
  }, [user?.id]);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency.code);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language.code);
  };

  const handleContinueFromCurrency = () => {
    if (selectedCurrency) {
      setCurrentStep('language');
      setSearchTerm(''); // Clear search term when moving to language step
    }
  };

  const handleBackToLanguage = () => {
    setCurrentStep('currency');
    setSearchTerm('');
  };

  const handleFinalSubmit = () => {
    if (selectedCurrency && selectedLanguage) {
      updateUserPreferences(selectedCurrency, selectedLanguage);
      navigate('/reminder');
    }
   
  };

  // Filter logic based on current step
  const filteredItems = currentStep === 'currency' 
    ? CURRENCIES.filter((currency) =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : LANGUAGES.filter((language) =>
        language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        language.code.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const selectedItem = currentStep === 'currency' ? selectedCurrency : selectedLanguage;
  const items = currentStep === 'currency' ? CURRENCIES : LANGUAGES;
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen">
      {/* Error Display */}
      {error && (
        <div className="fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg z-20">
          {error}
        </div>
      )}

      {/* Fixed Header with glassmorphism effect */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-white/20 z-10 shadow-lg">
        <div className="px-6 py-6">
          {/* Progress indicator */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${
                currentStep === 'currency' 
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white' 
                  : selectedCurrency 
                    ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-200' 
                    : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </div>
              <div className={`w-12 h-1 rounded-full transition-all ${
                selectedCurrency ? 'bg-emerald-200' : 'bg-slate-200'
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${
                currentStep === 'language' 
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white' 
                  : selectedLanguage 
                    ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-200' 
                    : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-lg text-slate-600 mt-2 font-medium">
              {currentStep === 'currency' 
                ? 'Choose your preferred currency' 
                : 'Select your language preference'
              }
            </p>
          </div>

          {/* Enhanced Search Input */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={`Search ${currentStep === 'currency' ? 'currencies' : 'languages'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500
                         placeholder-slate-400 text-slate-700 shadow-sm transition-all duration-200
                         hover:bg-white/90 hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="pt-44 pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg">
                No {currentStep === 'currency' ? 'currencies' : 'languages'} found matching "{searchTerm}"
              </div>
            </div>
          ) : (
            <div className="space-y-2 pt-30">
              {filteredItems.map((item) => (
                <div
                  key={item.code}
                  className={`group relative cursor-pointer transition-all duration-200 ${
                    selectedItem === item.code 
                      ? 'transform scale-[1.02]' 
                      : 'hover:transform hover:scale-[1.01]'
                  }`}
                  onClick={() => currentStep === 'currency' 
                    ? handleCurrencySelect(item as Currency) 
                    : handleLanguageSelect(item as Language)
                  }
                >
                  <div className={`
                    relative px-6 py-4 rounded-xl border transition-all duration-200
                    ${selectedItem === item.code
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg ring-2 ring-emerald-500/20'
                      : 'bg-white/60 backdrop-blur-sm border-slate-200/50 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-md'
                    }
                  `}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                            ${selectedItem === item.code
                              ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg'
                              : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 group-hover:from-slate-200 group-hover:to-slate-300'
                            }
                          `}>
                            {item.code.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className={`font-semibold transition-colors ${
                              selectedItem === item.code ? 'text-emerald-800' : 'text-slate-700'
                            }`}>
                              {item.name}
                            </h3>
                            <p className={`text-sm transition-colors ${
                              selectedItem === item.code ? 'text-emerald-600' : 'text-slate-500'
                            }`}>
                              {item.code}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {selectedItem === item.code && (
                        <div className="animate-in fade-in-50 duration-200">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Note */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-slate-500 text-sm bg-white/40 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-200/50">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You can change your {currentStep} selection anytime later</span>
          </div>
        </div>
      </div>

      {/* Enhanced Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-white/20 z-10 shadow-2xl">
        <div className="px-6 py-4">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {currentStep === 'language' && (
                <button
                  onClick={handleBackToLanguage}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 flex items-center space-x-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>
              )}
              
              <div className="text-sm text-slate-600">
                {currentStep === 'currency' ? (
                  selectedCurrency ? (
                    <span className="font-medium text-emerald-600">
                      Selected: {CURRENCIES.find(c => c.code === selectedCurrency)?.name}
                    </span>
                  ) : (
                    'Please select a currency to continue'
                  )
                ) : (
                  selectedLanguage ? (
                    <span className="font-medium text-emerald-600">
                      Selected: {LANGUAGES.find(l => l.code === selectedLanguage)?.name}
                    </span>
                  ) : (
                    'Please select a language to continue'
                  )
                )}
              </div>
            </div>

            <button
              onClick={currentStep === 'currency' ? handleContinueFromCurrency : handleFinalSubmit}
              disabled={
                (currentStep === 'currency' && !selectedCurrency) || 
                (currentStep === 'language' && !selectedLanguage) ||
                isLoading
              }
              className={`
                px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200
                ${(currentStep === 'currency' && selectedCurrency) || (currentStep === 'language' && selectedLanguage)
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === 'currency' ? 'Continue' : 'Save Preferences'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyLanguageSelector;