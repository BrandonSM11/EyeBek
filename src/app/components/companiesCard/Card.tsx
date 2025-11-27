import React from 'react';
import { Building2, Users, CreditCard, TrendingUp } from 'lucide-react';

interface Company {
  name: string;
  industry: string;
  description: string;
  employees: number;
  activeUsers: number;
  plan: string;
  linkedSince: string;
  admin: {
    name: string;
    role: string;
  };
}

const CompanyCard = ({ company }: { company: Company }) => {
  const getPlanColor = (plan: string) => {
    const colors = {
      'Enterprise': 'bg-purple-100 text-purple-700',
      'Professional': 'bg-blue-100 text-blue-700',
      'Basic': 'bg-gray-100 text-gray-700'
    };
    return colors[plan as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header con logo y rating */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {company.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
          <Users className="text-blue-600" size={24} />
          <div>
            <p className="text-2xl font-bold text-gray-900">{company.employees}</p>
            <p className="text-xs text-gray-600">Empleados</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
          <TrendingUp className="text-green-600" size={24} />
          <div>
            <p className="text-2xl font-bold text-gray-900">{company.activeUsers}</p>
            <p className="text-xs text-gray-600">Activos</p>
          </div>
        </div>
      </div>

      {/* Plan y detalles */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="text-gray-500" size={18} />
            <span className="text-sm font-medium text-gray-700">Plan</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPlanColor(company.plan)}`}>
            {company.plan}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-gray-500" size={18} />
            <span className="text-sm font-medium text-gray-700">Vinculada desde</span>
          </div>
          <span className="text-sm text-gray-600">{company.linkedSince}</span>
        </div>
      </div>

      {/* Footer con admin */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">{company.admin.name}</p>
            <p className="text-xs text-gray-500">{company.admin.role}</p>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

const companies = [
  {
    name: "TechCorp SA",
    industry: "Tecnología",
    employees: 245,
    activeUsers: 238,
    plan: "Enterprise",
    linkedSince: "Ene 2024",
    admin: {
      name: "Carlos Rodríguez",
      role: "Director de Recursos Humanos"
    }
  },
  {
    name: "InnovateLab",
    industry: "Consultoría",
    employees: 87,
    activeUsers: 82,
    plan: "Professional",
    linkedSince: "Mar 2024",
    admin: {
      name: "María González",
      role: "Gerente de Operaciones"
    }
  },
  {
    name: "StartUp Hub",
    industry: "Coworking",
    employees: 42,
    activeUsers: 40,
    plan: "Basic",
    linkedSince: "May 2024",
    admin: {
      name: "Pedro Sánchez",
      role: "Community Manager"
    }
  }
];

export { CompanyCard, companies };