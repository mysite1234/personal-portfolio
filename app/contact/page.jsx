"use client";
import React, { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Header from "../page";
import { 
  Mail, 
  MessageCircle, 
  Linkedin, 
  FileText,
  Calendar,
  Briefcase,
  Building,
  User,
  Send,
  CheckCircle,
  Zap,
  Lightbulb,
  Users,
  ArrowRight,
  Sparkles,
  Globe,
  Rocket,
  Clock,
  Shield,
  Target,
  Award,
  Heart,
  Star,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom animation styles
const AnimationStyles = () => {
  return (
    <style jsx global>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      @keyframes pulse-ring {
        0% { transform: scale(0.95); opacity: 0.8; }
        100% { transform: scale(1.1); opacity: 0; }
      }
      
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-gradient-flow {
        animation: gradientFlow 4s ease infinite;
        background-size: 200% auto;
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite linear;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255,255,255,0.4) 50%, 
          transparent 100%);
        background-size: 200% auto;
      }
      
      .animate-pulse-ring {
        animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .animate-slide-in {
        animation: slideIn 0.3s ease-out forwards;
      }
      
      .glass-effect {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
      }
      
      /* Custom focus styles */
      .custom-focus:focus {
        outline: none;
        ring: 2px;
        ring-color: rgba(59, 130, 246, 0.3);
        border-color: rgb(59, 130, 246);
      }
    `}</style>
  );
};

// Contact methods data
const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" />,
    name: "Email",
    detail: "mano321114@gmail.com",
    href: "mailto:mano321114@gmail.com",
    color: "from-blue-500 to-cyan-500",
    accentColor: "bg-blue-500",
    description: "Quick response within 24 hours"
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    name: "WhatsApp",
    detail: "+91 87542 74589",
    href: "https://wa.me/918754274589",
    isWhatsApp: true,
    color: "from-green-500 to-emerald-500",
    accentColor: "bg-green-500",
    description: "Immediate response available"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    name: "LinkedIn",
    detail: "/in/manoj-mano",
    href: "https://www.linkedin.com/in/manoj-mano-ab565424a",
    color: "from-blue-600 to-blue-700",
    accentColor: "bg-blue-600",
    description: "Professional network"
  },
];

const strengths = [
  { icon: <Rocket className="w-5 h-5" />, text: "Modern Tech Stack Expert", subtext: "React, Next.js, TypeScript" },
  { icon: <Lightbulb className="w-5 h-5" />, text: "Problem Solver", subtext: "Creative solutions for complex challenges" },
  { icon: <Users className="w-5 h-5" />, text: "Team Player", subtext: "Collaborative & communicative" },
  { icon: <Target className="w-5 h-5" />, text: "Result Driven", subtext: "Focus on delivery & impact" },
];

const stats = [
  { value: "3+", label: "Projects Completed", icon: <CheckCircle className="w-4 h-4" /> },
  { value: "2", label: "Years Experience", icon: <Award className="w-4 h-4" /> },
  { value: "24h", label: "Avg. Response Time", icon: <Clock className="w-4 h-4" /> },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    message: "",
  });
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef();

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("qI8fsHmRo3dsSJjY8");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const sendThankYouEmail = async (hrData) => {
    try {
      const templateParams = {
        to_email: hrData.email,
        to_name: hrData.name,
        from_name: "Manoj",
        company: hrData.company,
        position: hrData.position,
        message: hrData.message,
        reply_to: 'mano321114@gmail.com',
        subject: `Thank You for Your Interest - ${hrData.name}`,
      };

      return await emailjs.send(
        'service_o26no4q',
        'template_p6jx42r',
        templateParams
      );
    } catch (error) {
      console.error('Failed to send thank you email:', error);
      throw error;
    }
  };

  const sendOpportunityNotification = async (hrData) => {
    try {
      const templateParams = {
        hr_name: hrData.name,
        hr_email: hrData.email,
        company: hrData.company,
        position: hrData.position,
        opportunity_details: hrData.message,
        timestamp: new Date().toLocaleString(),
        subject: `New Opportunity from ${hrData.company}`,
        to_email: 'mano321114@gmail.com',
      };

      return await emailjs.send(
        'service_o26no4q',
        'template_3adgt7a', 
        templateParams
      );
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const [thankYouResult, notificationResult] = await Promise.allSettled([
        sendThankYouEmail(formData),
        sendOpportunityNotification(formData)
      ]);

      const thankYouSent = thankYouResult.status === 'fulfilled';
      const notificationSent = notificationResult.status === 'fulfilled';

      if (thankYouSent && notificationSent) {
        setStatus({
          type: "success",
          message: "Thank you for your interest! I've received your opportunity details and will get back to you within 24 hours. A confirmation email has been sent to your inbox."
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } else if (thankYouSent) {
        setStatus({
          type: "success", 
          message: "Thank you for your interest! I've received your details and will get back to you soon. A confirmation email has been sent to your inbox."
        });
      } else if (notificationSent) {
        setStatus({
          type: "success",
          message: "Thank you for your interest! I've received your opportunity details and will review them shortly."
        });
      } else {
        setStatus({
          type: "error",
          message: "Thank you for your submission! I've received your details. If you don't receive a confirmation email within a few minutes, please contact me directly."
        });
      }

      setFormData({ 
        name: "", 
        email: "", 
        company: "", 
        position: "", 
        message: "" 
      });
      
    } catch (error) {
      setStatus({
        type: "error",
        message: "There was an issue sending your message. Please try again or contact me directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full px-5 py-3.5 rounded-xl outline-none transition-all duration-300 placeholder-gray-400 disabled:opacity-50";
    const focusClass = "border-2 border-blue-500 bg-white shadow-md";
    const filledClass = "bg-gray-50 border border-gray-200";
    const emptyClass = "bg-gray-50/80 border border-gray-200";
    
    let className = baseClass;
    
    if (focusedField === fieldName) {
      className += ` ${focusClass} text-gray-800`;
    } else if (formData[fieldName]) {
      className += ` ${filledClass} text-gray-700`;
    } else {
      className += ` ${emptyClass} text-gray-800`;
    }
    
    return className;
  };

  const getTextareaClass = () => {
    const baseClass = "w-full px-5 py-3.5 rounded-xl outline-none transition-all duration-300 placeholder-gray-400 disabled:opacity-50 resize-none";
    const focusClass = "border-2 border-blue-500 bg-white shadow-md";
    const filledClass = "bg-gray-50 border border-gray-200";
    const emptyClass = "bg-gray-50/80 border border-gray-200";
    
    let className = baseClass;
    
    if (focusedField === 'message') {
      className += ` ${focusClass} text-gray-800`;
    } else if (formData.message) {
      className += ` ${filledClass} text-gray-700`;
    } else {
      className += ` ${emptyClass} text-gray-800`;
    }
    
    return className;
  };

  return (
    <>
      <AnimationStyles />
      <Header />
      
      {/* Success Toast Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
              <CheckCircle className="w-5 h-5" />
              <div>
                <p className="font-semibold">Message Sent Successfully!</p>
                <p className="text-sm opacity-90">Confirmation email has been sent</p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="ml-4 hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="min-h-screen bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-4 h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/3 right-20 w-3 h-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-sm"
          />
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-sm"
          />
          
          {/* Gradient Orbs */}
          <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-50/10 to-purple-50/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-50/5 to-rose-50/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, #667eea 1px, transparent 1px),
                               linear-gradient(to bottom, #667eea 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-24"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-ring"></div>
                <span className="text-sm font-semibold text-gray-700 tracking-wider">LET'S CREATE TOGETHER</span>
              </div>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
            >
              <span className="block text-gray-900">Build The</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-flow">
                  Future
                </span>
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-50"></div>
              </span>
              <span className="block text-gray-900 mt-4">With Great Talent</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Looking for a passionate developer to transform your vision into reality? 
              Let's collaborate on building exceptional digital experiences.
            </motion.p>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              {/* HR CTA */}
              

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                id="contact-form"
                className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-xl hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className="relative">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl lg:rounded-2xl flex items-center justify-center">
                      <Send className="w-6 lg:w-7 h-6 lg:h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                      <Star className="w-2.5 lg:w-3 h-2.5 lg:h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Opportunity Details</h3>
                    <p className="text-gray-600 mt-1 text-sm lg:text-base">Share role details for a prompt response</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} ref={formRef} className="space-y-6 lg:space-y-8">
                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User className="w-4 h-4" />
                        Your Name
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        placeholder="John Smith"
                        required
                        disabled={isSubmitting}
                        className={getInputClass('name')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="w-4 h-4" />
                        Work Email
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        placeholder="john@company.com"
                        required
                        disabled={isSubmitting}
                        className={getInputClass('email')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Building className="w-4 h-4" />
                        Company
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => handleFocus('company')}
                        onBlur={handleBlur}
                        placeholder="Company Name"
                        required
                        disabled={isSubmitting}
                        className={getInputClass('company')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Briefcase className="w-4 h-4" />
                        Position
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        onFocus={() => handleFocus('position')}
                        onBlur={handleBlur}
                        placeholder="Frontend Developer"
                        required
                        disabled={isSubmitting}
                        className={getInputClass('position')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MessageCircle className="w-4 h-4" />
                      Opportunity Details
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      placeholder="Describe the role, team, tech stack, and what makes this opportunity unique..."
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className={getTextareaClass()}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 lg:py-5 px-6 rounded-xl hover:shadow-xl lg:hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm lg:text-base">Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span className="text-sm lg:text-base lg:text-lg">Submit Opportunity</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {status.message && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`rounded-xl border p-4 lg:p-5 ${
                          status.type === 'success' 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                            : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3 lg:gap-4">
                          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                            status.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {status.type === 'success' ? (
                              <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-600" />
                            ) : (
                              <div className="w-4 lg:w-5 h-4 lg:h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs lg:text-sm">
                                !
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
                              {status.type === 'success' ? 'Success!' : 'Important'}
                            </h4>
                            <p className="text-gray-700 mt-1 text-xs lg:text-sm">{status.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6 lg:space-y-8">
              {/* Contact Methods */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-7 border border-gray-100 shadow-xl"
              >
                <div className="mb-6 lg:mb-7">
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="w-5 lg:w-6 h-5 lg:h-6 text-blue-600" />
                    Connect With Me
                  </h4>
                  <p className="text-gray-600 text-sm lg:text-base">Choose your preferred channel</p>
                </div>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.name}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setActiveMethod(index)}
                      onMouseLeave={() => setActiveMethod(null)}
                      whileHover={{ x: 5 }}
                      className="block group"
                    >
                      <div className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl lg:rounded-2xl border transition-all duration-300 ${
                        activeMethod === index 
                          ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}>
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {method.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm lg:text-base">{method.name}</span>
                            {method.isWhatsApp && (
                              <span className="text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full animate-pulse">
                                Live
                              </span>
                            )}
                          </div>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">{method.detail}</p>
                          <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                        </div>
                        <ArrowRight className={`w-4 lg:w-5 h-4 lg:h-5 transition-all duration-300 ${
                          activeMethod === index ? 'text-blue-600 translate-x-1' : 'text-gray-400'
                        }`} />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Strengths */}
             

            
            </div>
          </div>

          {/* Footer Note */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-100"
          >
            <p className="text-gray-500 text-sm">
              Looking forward to hearing from you! ✨
            </p>
          
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;