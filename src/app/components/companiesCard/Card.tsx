"use client"
import React from 'react';
import { Building2, Users, CreditCard, TrendingUp, Trash2, Edit } from 'lucide-react';
import { Company } from '@/types/company';

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

const CompanyCard = ({ company, onEdit, onDelete }: CompanyCardProps) => {
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
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">

          <div>
            <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>
      </div>

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

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">{company.admin.name}</p>
            <p className="text-xs text-gray-500">{company.admin.role}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(company)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Edit size={16} />
            Editar
          </button>
          <button 
            onClick={() => onDelete(company.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;