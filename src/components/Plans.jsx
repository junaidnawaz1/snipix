import { 
  FaCheckCircle,
  FaCrown,
  FaRocket,
  FaHeadset
} from "react-icons/fa";

const Plans = () => {
  const plans = [
    {
      name: "Basic",
      duration: "1 Month",
      price: "$5",
      features: [
        "10,000 link clicks/mo",
        "Basic analytics",
        "QR Code generation",
        "Email support"
      ]
    },
    {
      name: "Professional",
      duration: "6 Months",
      price: "$25",
      features: [
        "50,000 link clicks/mo",
        "Advanced analytics",
        "Custom domains",
        "Priority support",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      duration: "1 Year",
      price: "$45",
      features: [
        "Unlimited clicks",
        "Premium analytics",
        "Multiple custom domains",
        "Dedicated account manager",
        "White-label options",
        "24/7 support"
      ]
    }
  ];

  return (
    <div className="mt-16 py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-center text-blue-800">Pricing Plans</h2>
        <p className="text-lg text-purple-600 text-center mb-12">Choose the perfect plan for your needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-purple-500 transform md:-translate-y-4' : 'border-transparent'} flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center">
                  <FaCrown className="mr-1" /> MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2 text-purple-800">{plan.name}</h3>
              <p className="text-gray-600 mb-1">{plan.duration}</p>
              <p className="text-3xl font-bold mb-6 text-blue-600">{plan.price}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`mt-auto w-full py-3 px-6 rounded-lg font-bold ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors duration-300 cursor-not-allowed`}
                disabled
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-purple-700">Need custom solutions? <a href="/feedback" className="font-semibold underline hover:text-purple-900">Feed Back us</a></p>
        </div>
      </div>
    </div>
  );
};

export default Plans;