"use client"
import {companies, CompanyCard} from "@/app/components/companiesCard/Card";
export default function Home() {



  return (
    <>
    <CompanyCard company={companies[0]} />
    </>
    
    
  );
}