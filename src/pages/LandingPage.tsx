import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Sparkles, Users, Shield, Star, CheckCircle, Clock, ArrowRight, Zap } from 'lucide-react';
import yogaWoman from '../assets/images/yoga.jpg';
import muscularMan from '../assets/images/gym.jpeg';
import fitnessLogo from '../assets/images/arvyax-logo.svg';

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes blob {
      0% {
        transform: scale(1) translate(0px, 0px);
      }
      33% {
        transform: scale(1.1) translate(30px, -50px);
      }
      66% {
        transform: scale(0.9) translate(-20px, 20px);
      }
      100% {
        transform: scale(1) translate(0px, 0px);
      }
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-fitness-light bg-fitness-pattern">
      {/* Header */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={fitnessLogo} alt="ArvyaX Logo" className="h-10 w-10 animate-pulse-slow" />
              <span className="text-2xl font-bold bg-gradient-fitness bg-clip-text text-transparent">
                ArvyaX
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-fitness-dark hover:text-fitness-primary font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-fitness text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 animate-pulse-slow"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-fitness-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-fitness-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-24 left-32 w-64 h-64 bg-fitness-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-fitness-dark mb-6 relative z-10">
              Transform Your <span className="bg-gradient-fitness bg-clip-text text-transparent animate-pulse-slow">Mind & Body</span>
              <span className="block bg-gradient-fitness bg-clip-text text-transparent">
                With ArvyaX
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-fitness-dark/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect balance of yoga and fitness with personalized plans, expert guidance, and a supportive community to nurture your holistic wellness journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="bg-gradient-fitness text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Begin Your Wellness Journey</span>
              <Dumbbell className="h-5 w-5 ml-2 animate-pulse-slow" />
            </Link>
            
            <Link
              to="/login"
              className="border-2 border-fitness-primary text-fitness-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-fitness-primary hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
          
          {/* Removed the two-image section as requested */}

          {/* Features Grid */}
          <h2 className="text-3xl font-bold mb-12 bg-gradient-fitness bg-clip-text text-transparent inline-block animate-pulse-slow">Why Choose ArvyaX</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-fitness-primary/30 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-fitness-primary/20 to-fitness-primary/30 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-slow">
                <Dumbbell className="h-6 w-6 text-fitness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-fitness-primary transition-colors">Personalized Yoga & Fitness</h3>
              <p className="text-fitness-dark">
                Customized programs that adapt to your skill level, goals, and preferences. Our AI-powered system evolves with your progress.
              </p>
              <div className="mt-4 text-fitness-primary font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore programs</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-fitness-secondary/30 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-fitness-secondary/20 to-fitness-secondary/30 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-slow">
                <Sparkles className="h-6 w-6 text-fitness-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-fitness-secondary transition-colors">Expert Instructors</h3>
              <p className="text-fitness-dark">
                Learn from certified yoga masters and fitness professionals with years of experience in transforming bodies and minds.
              </p>
              <div className="mt-4 text-fitness-secondary font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Meet our team</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-fitness-accent/30 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-fitness-accent/20 to-fitness-accent/30 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-slow">
                <Users className="h-6 w-6 text-fitness-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-fitness-accent transition-colors">Supportive Community</h3>
              <p className="text-fitness-dark">
                Join a global network of wellness enthusiasts who motivate each other through shared experiences and challenges.
              </p>
              <div className="mt-4 text-fitness-accent font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Join community</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
          
          {/* Features Showcase */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-fitness rounded-2xl transform rotate-1 scale-105 opacity-20 blur-lg animate-pulse-slow"></div>
                <img src={yogaWoman} alt="Yoga practice" className="relative z-10 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500 object-cover h-96 w-full" />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-float">
                  <Zap className="h-6 w-6 text-fitness-primary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-fitness bg-clip-text text-transparent inline-block">Mind-Body Harmony</h3>
                <p className="text-lg text-fitness-dark mb-6">
                  Our holistic approach integrates physical training with mental wellness techniques, creating a balanced path to overall health.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-fitness-primary/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-fitness-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">Stress Reduction</h4>
                      <p className="text-fitness-dark/70">Scientifically proven techniques to lower cortisol levels</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-fitness-secondary/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-fitness-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">Improved Flexibility</h4>
                      <p className="text-fitness-dark/70">Progressive routines that safely increase your range of motion</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-fitness-accent/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-fitness-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">Mental Clarity</h4>
                      <p className="text-fitness-dark/70">Meditation and mindfulness practices for improved focus</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/register"
                  className="mt-8 inline-block bg-gradient-fitness text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Strength Training Section */}
      <section className="py-16 bg-fitness-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-fitness bg-clip-text text-transparent inline-block">Strength & Performance</h3>
                <p className="text-lg text-fitness-dark mb-6">
                  Our comprehensive gym programs combine cutting-edge equipment with expert guidance to help you build strength, endurance, and confidence.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-fitness-primary/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-fitness-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">Personalized Training</h4>
                      <p className="text-fitness-dark/70">Custom workout plans tailored to your specific goals and fitness level</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-fitness-secondary/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-fitness-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">Strength Building</h4>
                      <p className="text-fitness-dark/70">Progressive resistance training to increase muscle mass and power</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-fitness-accent/10 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-fitness-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">Performance Tracking</h4>
                      <p className="text-fitness-dark/70">Advanced metrics to monitor your progress and celebrate achievements</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/register"
                  className="mt-8 inline-block bg-gradient-fitness text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Training
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-fitness rounded-2xl transform -rotate-1 scale-105 opacity-20 blur-lg animate-pulse-slow"></div>
                <img src={muscularMan} alt="Gym training" className="relative z-10 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500 object-cover h-96 w-full" />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-float">
                  <Dumbbell className="h-6 w-6 text-fitness-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-fitness bg-clip-text text-transparent inline-block mx-auto">What Our Athletes Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-indigo-400 to-indigo-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">"</span>
            </div>
            <p className="text-fitness-dark mb-4">"ArvyaX has completely transformed my approach to wellness. The guided yoga and fitness sessions are exactly what I needed to stay consistent with my training routine."</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">JD</span>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold">Jane Doe</h4>
                <p className="text-sm text-fitness-dark/70">Fitness Enthusiast</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-400 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">"</span>
            </div>
            <p className="text-fitness-dark mb-4">"The community aspect of ArvyaX is incredible. I've connected with like-minded wellness enthusiasts who keep me motivated on my yoga and fitness journey."</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">JS</span>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold">John Smith</h4>
                <p className="text-sm text-fitness-dark/70">Personal Trainer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-pink-400 to-pink-600 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">"</span>
            </div>
            <p className="text-fitness-dark mb-4">"I love how easy it is to track my progress with ArvyaX. The insights have helped me understand my body and mind connection to make meaningful improvements."</p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-bold">AJ</span>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold">Alex Johnson</h4>
                <p className="text-sm text-fitness-dark/70">Yoga Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-fitness-dark text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={fitnessLogo} alt="ArvyaX Logo" className="h-8 w-8 animate-pulse-slow" />
                <span className="text-xl font-bold bg-gradient-fitness bg-clip-text text-transparent">
                  ArvyaX
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering your wellness journey through expert yoga training, 
                fitness guidance, and transformative mind-body practices.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-300 hover:text-pink-400 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-300 hover:text-pink-400 transition-colors">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} ArvyaX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Add CSS for animations
const style = document.createElement('style');
style.innerHTML = `
@keyframes blob {
  0% {
    transform: scale(1) translate(0px, 0px);
  }
  33% {
    transform: scale(1.1) translate(30px, -50px);
  }
  66% {
    transform: scale(0.9) translate(-20px, 20px);
  }
  100% {
    transform: scale(1) translate(0px, 0px);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;
document.head.appendChild(style);

export default LandingPage;