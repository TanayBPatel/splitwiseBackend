

interface Props {
  theme: "light" | "dark";
}

const SignInWrapper: React.FC<Props> = ({ theme }) => {
  
  

  return (
    <div className="w-full max-w-md">
      
        appearance={{
          baseTheme: theme,
          elements: {
            rootBox: "w-full",
            card: `shadow-xl rounded-xl border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200"
            }`,
            headerTitle: "text-2xl font-bold",
            headerSubtitle:
              theme === "dark" ? "text-gray-300" : "text-gray-500",
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200",
            socialButtonsBlockButton:
              "w-full border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            socialButtonsProviderIcon: "w-5 h-5",
            formFieldLabel: `text-sm font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`,
            formFieldInput: `mt-1 block w-full rounded-md shadow-sm ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300"
            } focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`,
            footer: `mt-6 text-center text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`,
            footerActionLink:
              "font-medium text-indigo-600 hover:text-indigo-500",
          },
        }}
      />
    </div>
  );
};

export default SignInWrapper;
