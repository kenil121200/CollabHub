
import githubLogo from '../../assets/github.svg'
import Animation from '../Animation'
import LoginImage from '../../assets/loginImage.png'
import collabHubLogo from '../../assets/collabhub.svg';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const { handleLogin } = useAuth();
  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
    {/* <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"> */}
      <div className="flex flex-col items-start justify-center h-screen lg:w-2/6 lg:ml-20 ml-0 lg:items-start lg:text-left text-center">
        <p className="mb-4 text-base font-medium text-green-700">Discover, Unite, Code Together</p>
        <img src={collabHubLogo} alt="CollabHub logo" className="h-16 w-auto mb-4" />
        <p className="text-wrap text-lg text-gray-800 mb-4 leading-relaxed sm:max-w-none max-w-xs">
          CollabHub is an open-source platform where developers can discover,
          contribute to, and manage projects in one searchable environment.
        </p>
        <button onClick={() => handleLogin()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <img src={githubLogo} alt="Github logo" className="fill-current w-6 h-6 mr-4" />
          <span>Sign in with Github</span>
        </button>
      </div>
      
      <div className="absolute bottom-0 right-0 lg:block hidden w-3/5 xl:w-2/3 2xl:w-auto">
        <Animation />
        <img src={LoginImage} alt="Github logo" className="absolute bottom-0 right-0" />
      </div>
      </div>
    </>
    
  )
}


export default LoginPage