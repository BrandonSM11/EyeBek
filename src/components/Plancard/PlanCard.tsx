// components/PlanCard/PlanCard.tsx

export interface PlanDataFromBackend {
  categoria: string;      
  precio: number;         
  descripcion: string[];  
  tiempo?: string;        
}

export interface PlanCardProps {
  title?: string;
  subtitle: string;
  planData?: PlanDataFromBackend;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  currencySymbol?: string;
}

const PlanCard = ({
  title,
  subtitle,
  planData,
  buttonText = "Comenzar ahora",
  onButtonClick,
  className = "",
  currencySymbol = "$"
}: PlanCardProps) => {
  const displayTitle = title || planData?.categoria || "Plan";
  const price = planData?.precio || 0;
  const period = planData?.tiempo || "mes";
  const benefits = planData?.descripcion || [];

  return (
    <div className={`bg-white rounded-3xl shadow-lg p-8 max-w-md ${className}`}>
      <h2 className="text-4xl font-bold text-black mb-3">
        {displayTitle}
      </h2>
      
      <p className="text-gray-600 text-base mb-6">
        {subtitle}
      </p>
      
      <div className="mb-6">
        <span className="text-2xl font-normal text-black">{currencySymbol}</span>
        <span className="text-6xl font-bold text-black">{price}</span>
        <span className="text-xl text-gray-600"> /{period}</span>
      </div>
      
      <div className="mb-8">
        <button
          onClick={onButtonClick}
          className="w-full bg-white border-2 border-black text-black font-semibold py-3 px-4 rounded-lg hover:bg-black hover:text-white transition"
        >
          {buttonText}
        </button>
      </div>
      
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center mt-0.5">
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;